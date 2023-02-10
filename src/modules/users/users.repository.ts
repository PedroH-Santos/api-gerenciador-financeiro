import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/service/prisma.service';
import { CreateUserDTO } from './dto/createUser.dto';


@Injectable()
export class UsersRepository {
    constructor(private prismaService: PrismaService) { }

    async create(data: CreateUserDTO) {
        const user = this.prismaService.users.create({
            data: {
                email: data.email,
                password: data.password,
                name: data.name
            }
        })
        return user;
    }

}