import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/service/prisma.service';
import { CreateUserDTO } from './dto/createUser.dto';
import { Users } from '@prisma/client';


@Injectable()
export class UsersRepository {
    constructor(private prismaService: PrismaService) { }

    async create(data: CreateUserDTO) : Promise<Users> {
        const userCreated = await this.prismaService.users.create({
            data: {
                email: data.email,
                password: data.password,
                name: data.name
            }
        })

        return userCreated;
    }

}