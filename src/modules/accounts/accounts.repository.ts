import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Accounts } from '@prisma/client';
import { PrismaService } from '../../database/service/prisma.service';
import { CreateAccountDTO } from './dto/createAccount.dto';
import { EditAccountDTO } from './dto/editAccount.dto';
import { FilterAccountDTO } from './dto/filterAccount.dto';
import { UserTokenDTO } from '../authenticate/dto/userToken.dto';



@Injectable()
export class AccountRepository {
    constructor(private prismaService: PrismaService) { }




    async create(data: CreateAccountDTO) : Promise<Accounts> {
        const accountCreated = await this.prismaService.accounts.create({
            data: {
                name: data.name,
                priceInstallments: data.price / data.installments,
                installments: data.installments,
                price: data.price,
                status: data.status,
                type: data.type,
                groupId: data.groupId,
                dayDueDate: data.dayDueDate 
            } 
        }) 

        return accountCreated;
    }
 

    async listAll(user: UserTokenDTO): Promise<Accounts[]> {
        const accounts = await this.prismaService.accounts.findMany({
            where: {
                group: {
                    GroupsMembers: {
                        some: {
                            userId: user.userId
                        }
                    }
                }
            }
        });
        return accounts;
    }

    async listByGroup(groupId: string): Promise<Accounts[]> {
        const accounts = await this.prismaService.accounts.findMany({
            where: {
                groupId: groupId
            }
        });
        return accounts;
    }
    async findOne(id: string): Promise<Accounts> {
        const account = await this.prismaService.accounts.findFirst({
            where: { id: id },
        });
        return account;
    }

    async edit(id: string, data: EditAccountDTO ): Promise<Accounts> {
        const account = await this.prismaService.accounts.update({
            data: data,
            where: { id: id },
        })
        return account;
    }

    async delete(id: string): Promise<Accounts> {
        const account = await this.prismaService.accounts.delete({
            where: { id: id },
        })
        return account;
    }



    async filter(data: FilterAccountDTO): Promise<Accounts[]> {
        const accounts = await this.prismaService.accounts.findMany({
            where: {
                name: {
                    contains: data.name
                },
                dayDueDate: {
                    equals: data.dayDueDate,
                },
                status: {
                    equals: data.status
                },
                type: {
                    equals: data.type
                },
                groupId: {
                    equals: data.groupId
                }
            },
        })
        return accounts;
    }

}