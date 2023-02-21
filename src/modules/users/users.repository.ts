import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/service/prisma.service';
import { CreateUserDTO } from './dto/createUser.dto';
import { Users } from '@prisma/client';
import { EditUserDTO } from './dto/editUser.dto';
import { hash } from "bcryptjs";

@Injectable()
export class UsersRepository {
    constructor(private prismaService: PrismaService) { }

    async create(data: CreateUserDTO) : Promise<Users> {
        const passwordHash = await hash(data.password,8);
        const userCreated = await this.prismaService.users.create({
            data: {
                email: data.email,
                password: passwordHash,
                name: data.name,
                image: data.image,
            } 
        }) 

        return userCreated;
    }
 

    async listAll(): Promise<Users[]> {
        const users = await this.prismaService.users.findMany();
        return users;
    }

    async findOne(id: string): Promise<Users> {
        const user = await this.prismaService.users.findFirst({
            where: { id: id },
        });
        return user;
    }

    async findByEmail(email: string): Promise<Users> {
        const user = await this.prismaService.users.findFirst({
            where: { email: email },
        });
        return user;
    }

    async edit(id: string, data: EditUserDTO ): Promise<Users> {
        const userFind = await this.findOne(id);
        if(!userFind) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error:  'Usuário não encontrado'
            }, HttpStatus.BAD_REQUEST);
        }
        
        const user = await this.prismaService.users.update({
            data: data,
            where: { id: id },
        })
        return user;
    }

    async delete(id: string) {
        const userFind = await this.findOne(id);
        if (!userFind) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Usuário não encontrado'
            }, HttpStatus.BAD_REQUEST);
        }

        await this.prismaService.users.delete({
            where: { id: id },
        })
    }




}