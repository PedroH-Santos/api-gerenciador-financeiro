import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/service/prisma.service';
import { Registers } from '@prisma/client';
import { CreateRegisterDTO } from './dto/createRegister.dto';
import { EditRegisterDTO } from './dto/editRegister.dto';
import { FilterRegisterDTO } from './dto/filterRegister.dto';



@Injectable()
export class RegistersRepository {
    constructor(private prismaService: PrismaService) { }

    async create(data: CreateRegisterDTO): Promise<Registers> {
        const registerCreated = await this.prismaService.registers.create({
            data: {
                name: data.name,
                price: data.price,
                status: data.status,
                groupId: data.groupId
      
            }
        })

        return registerCreated;
    }


    async listAll(groupId:  string): Promise<Registers[]> {
        const registers = await this.prismaService.registers.findMany({
            where: {
                groupId: groupId
            }
        });
        return registers;
    }

    async findOne(id: string): Promise<Registers> {
        const register = await this.prismaService.registers.findFirst({
            where: { id: id },
        });
        return register;
    }

    async edit(id: string, data: EditRegisterDTO): Promise<Registers> {
        const register = await this.prismaService.registers.update({
            data: data,
            where: { id: id },
        })
        return register;
    }

    async delete(id: string) {
        const registerDelete = await this.prismaService.registers.delete({
            where: { id: id },
        })
        return registerDelete;
    }


    async filter(data: FilterRegisterDTO): Promise<Registers[]> {
        const registers = await this.prismaService.registers.findMany({
            where: { 
                name: {
                    contains: data.name
                },
             },
        })
        return registers;
    }



}