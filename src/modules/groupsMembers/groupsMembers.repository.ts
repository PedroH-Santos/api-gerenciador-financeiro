import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/service/prisma.service';
import {  GroupsMembers } from '@prisma/client';
import { UserTokenDTO } from '../authenticate/dto/userToken.dto';



@Injectable()
export class GroupsMembersRepository {
    constructor(private prismaService: PrismaService) { }

    async create(groupId: string, user: UserTokenDTO) {


        await this.prismaService.groupsMembers.create({
            data: {
                groupId: groupId,
                userId: user.userId,
            }

        })
    }

    async findOne(userId: string, groupId: string): Promise<GroupsMembers> {
        const groupsMembers = await this.prismaService.groupsMembers.findFirst({
            where: {
                userId: userId,
                groupId: groupId
            },
        });
        return groupsMembers;
    }

    async delete(id: string) {
        await this.prismaService.groupsMembers.delete({
            where: {
                id: id
            }
        })

    }
    async listAllByGroup(groupId: string): Promise<GroupsMembers[]> {
        const members = await this.prismaService.groupsMembers.findMany({
            include: {
                user: true,
            },
            where: {
                groupId: groupId
            },
        });
        return members;
    }
}