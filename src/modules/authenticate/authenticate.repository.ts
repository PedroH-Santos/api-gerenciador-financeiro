import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/service/prisma.service';
import { UsersTokens } from '@prisma/client';





@Injectable()
export class AuthenticateRepository {
    constructor(private prismaService: PrismaService) { }

    async create(userId: string, refreshToken: string): Promise<UsersTokens> {
        const tokenCreated = await this.prismaService.usersTokens.create({
            data: {
                refreshToken: refreshToken,
                userId: userId

            }
        })

        return tokenCreated;
    }


    async findOneByUserId(userId: string): Promise<UsersTokens> {
        const token = await this.prismaService.usersTokens.findFirst({
            where: { userId: userId },
        });
        return token;
    }

    async edit(userId: string, refreshToken: string): Promise<UsersTokens> {

        const token = await this.prismaService.usersTokens.update({
            data: {
                refreshToken: refreshToken,
                user: {
                    connect: {
                        id: userId,
                    }
                }
            },
            where: { userId: userId },
            
        })
        return token;
    }

    async delete(id: string) {
        const tokenFind = await this.findOneByUserId(id);
        if (!tokenFind) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Token não encontrado'
            }, HttpStatus.BAD_REQUEST);
        }

        await this.prismaService.usersTokens.delete({
            where: { id: id },
        })
    }




}