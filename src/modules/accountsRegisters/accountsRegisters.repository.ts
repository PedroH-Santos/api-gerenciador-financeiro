import { Injectable } from '@nestjs/common';
import {  AccountsRegisters } from '@prisma/client';
import { PrismaService } from '../../database/service/prisma.service';
import { CreateAccountsRegistersDTO } from './dto/CreateAccountsRegisters.dto';
import { EditAccountsRegistersDTO } from './dto/editAccountsRegisters.dto';
import { FilterAccountsRegistersDTO } from './dto/filterAccount.dto';
import { AccountRepository } from '../accounts/accounts.repository';
import { GroupRepository } from '../groups/groups.repository';




@Injectable()
export class AccountRegistersRepository {
    constructor(private prismaService: PrismaService) { }


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


    async listAll(): Promise<AccountsRegisters[]> {
        const accountsRegister = await this.prismaService.accountsRegisters.findMany();
        return accountsRegister;
    }

    async listByGroup(groupId: string): Promise<AccountsRegisters[]> {
        const accountsRegister = await this.prismaService.accountsRegisters.findMany({
            include: {
                accounts: true,
            },
            where: {
                accounts: {
                    group: {
                        id: groupId
                    }
                }
            }
        });
        return accountsRegister;
    }

    async findOne(id: string): Promise<AccountsRegisters> {
        const accountsRegister = await this.prismaService.accountsRegisters.findFirst({
            where: { id: id },
        });
        return accountsRegister;
    }

    async edit(id: string, data: EditAccountsRegistersDTO): Promise<AccountsRegisters> {
        const accountsRegister = await this.prismaService.accountsRegisters.update({
            data: data,
            where: { id: id },
        })
        return accountsRegister;
    }

    async delete(id: string) {
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
                    in: data.status
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