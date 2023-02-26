import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Accounts, AccountsRegisters } from '@prisma/client';
import { PrismaService } from '../../database/service/prisma.service';
import { CreateAccountsRegistersDTO } from './dto/CreateAccountsRegisters.dto';
import { EditAccountsRegistersDTO } from './dto/editAccountsRegisters.dto';
import { FilterAccountsRegistersDTO } from './dto/filterAccount.dto';
import { FilterAccountDTO } from '../accounts/dto/filterAccount.dto';
import { AccountRepository } from '../accounts/accounts.repository';




@Injectable()
export class AccountRegistersRepository {
    constructor(private prismaService: PrismaService, private accountRepository: AccountRepository) { }


    async createRegister(groupId: string) {
        const filter: FilterAccountDTO = { groupId: groupId };
        const accounts = await this.accountRepository.filter(filter);
        const accountsRegisters = await this.getRegistersByMonth(groupId);

        accounts.forEach(account => {
            const findRegisterInMonth = accountsRegisters.find(register => register.accountId == account.id);
            if (!findRegisterInMonth) {
                const dueDateNow = new Date((new Date().getMonth() + 1) + '/' + account.dayDueDate  +  "/" + new Date().getFullYear()).toISOString();
                const newRegister: CreateAccountsRegistersDTO = {
                    accountId: account.id,
                    dueDate: dueDateNow,
                    price: account.priceInstallments,
                    installments: account.installments
                };
                this.create(newRegister);
            }
        });


    }

    async create(data: CreateAccountsRegistersDTO): Promise<AccountsRegisters> {

        const accountRegisterCreated = await this.prismaService.accountsRegisters.create({
            data: {
                dueDate: data.dueDate,
                price: data.price,
                accountId: data.accountId,
                

            }
        })

        return accountRegisterCreated;
    }


    async listAll(groupId: string): Promise<AccountsRegisters[]> {
        const accountsRegister = await this.prismaService.accountsRegisters.findMany();
        return accountsRegister;
    }

    async findOne(id: string): Promise<AccountsRegisters> {
        const accountsRegister = await this.prismaService.accountsRegisters.findFirst({
            where: { id: id },
        });
        return accountsRegister;
    }

    async edit(id: string, data: EditAccountsRegistersDTO): Promise<AccountsRegisters> {
        const accountRegisterFind = await this.findOne(id);
        if (!accountRegisterFind) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Registro de conta não encontrado'
            }, HttpStatus.BAD_REQUEST);
        }

        const accountsRegister = await this.prismaService.accountsRegisters.update({
            data: data,
            where: { id: id },
        })
        return accountsRegister;
    }

    async delete(id: string) {
        const accountRegisterFind = await this.findOne(id);
        if (!accountRegisterFind) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Registro de conta não encontrado'
            }, HttpStatus.BAD_REQUEST);
        }

        await this.prismaService.accountsRegisters.delete({
            where: { id: id },
        })
    }



    async filter(data: FilterAccountsRegistersDTO): Promise<AccountsRegisters[]> {
        const accountsRegister = await this.prismaService.accountsRegisters.findMany({
            where: {
                dueDate: {
                  
                    equals: data.dueDate,
                },
                status: {
                    equals: data.status
                },
                accountId: {
                    equals: data.accountId
                },

            },
        })
        return accountsRegister;
    }

    async getRegistersByMonth(groupId: string): Promise<AccountsRegisters[]> {
        const accountsRegisters: AccountsRegisters[] = await this.prismaService.$queryRaw`
        SELECT * FROM "accountsRegisters" ar  
        JOIN accounts ac on ac.id = ar."accountId"
        WHERE ac."groupId" = ${groupId} AND
        date_part('month',ar."createdAt") =  date_part('month', (SELECT current_timestamp))`;
        
        return accountsRegisters;
    }

}