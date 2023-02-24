import { Injectable } from '@nestjs/common';
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





}