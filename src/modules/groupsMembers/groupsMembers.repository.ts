import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../../database/service/prisma.service';
import { GroupsMembers } from '@prisma/client';
import { UserTokenDTO } from '../authenticate/dto/userToken.dto';
import { JoinGroupDTO } from './dto/joinGroup.dto';


@Injectable()
export class GroupsMembersRepository {
    constructor(private prismaService: PrismaService) { }

    async create(data: JoinGroupDTO, user: UserTokenDTO): Promise<GroupsMembers> {
        const groupMemberCreated = await this.prismaService.groupsMembers.create({
            data: {
                groupId: data.groupId,
                userId: user.userId,
            }
        })
        return groupMemberCreated;
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

    async delete(data: JoinGroupDTO, user: UserTokenDTO){
         
        const groupMembersFind = await this.findOne(user.userId,data.groupId);
        if (!groupMembersFind) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Usuário não encontrado nesse grupo'
            }, HttpStatus.BAD_REQUEST);
        }
        await this.prismaService.groupsMembers.delete({
            where: { 
                id: groupMembersFind.id
            }
        })
    }

}