import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Accounts } from '@prisma/client';
import { PrismaService } from '../../database/service/prisma.service';
import { CreateAccountDTO } from './dto/createAccount.dto';
import { EditAccountDTO } from './dto/editAccount.dto';
import { FilterAccountDTO } from './dto/filterAccount.dto';



@Injectable()
export class AccountRepository {
    constructor(private prismaService: PrismaService) { }

    async create(data: CreateAccountDTO) : Promise<Accounts> {
        const accountCreated = await this.prismaService.accounts.create({
            data: {
                name: data.name,
                dueDate: data.dueDate,
                installments: data.installments,
                price: data.price,
                origin: data.origin,
                status: data.status,
                type: data.type
            } 
        }) 

        return accountCreated;
    }
 

    async listAll(): Promise<Accounts[]> {
        const accounts = await this.prismaService.accounts.findMany();
        return accounts;
    }

    async findOne(id: string): Promise<Accounts> {
        const account = await this.prismaService.accounts.findFirst({
            where: { id: id },
        });
        return account;
    }

    async edit(id: string, data: EditAccountDTO ): Promise<Accounts> {
        const accountFind = await this.findOne(id);
        if (!accountFind) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error:  'Usuário não encontrado'
            }, HttpStatus.BAD_REQUEST);
        }
        
        const account = await this.prismaService.accounts.update({
            data: data,
            where: { id: id },
        })
        return account;
    }

    async delete(id: string) {
        const accountFind = await this.findOne(id);
        if (!accountFind) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Usuário não encontrado'
            }, HttpStatus.BAD_REQUEST);
        }

        await this.prismaService.accounts.delete({
            where: { id: id },
        })
    }



    async filter(data: FilterAccountDTO): Promise<Accounts[]> {
        const accounts = await this.prismaService.accounts.findMany({
            where: {
                name: {
                    contains: data.name
                },
                dueDate: {
                    equals: data.dueDate,
                },
                status: {
                    equals: data.status
                },
                origin: {
                    equals: data.origin
                },
                type: {
                    equals: data.type
                }
            },
        })
        return accounts;
    }

}