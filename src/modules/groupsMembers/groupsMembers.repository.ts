import { HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { PrismaService } from '../../database/service/prisma.service';
import { Groups, GroupsMembers } from '@prisma/client';
import { UserTokenDTO } from '../authenticate/dto/userToken.dto';
import { JoinGroupDTO } from './dto/joinGroup.dto';
import { GroupRepository } from '../groups/groups.repository';
import { FilterGroupsDTO } from '../groups/dto/filterGroups.dto';
import { OutGroupDTO } from './dto/outGroup.dto';


@Injectable()
export class GroupsMembersRepository {
    constructor(private prismaService: PrismaService,
        @Inject(forwardRef(() => GroupRepository))
        private groupsRepository: GroupRepository,
    ) { }

    async create(data: JoinGroupDTO, user: UserTokenDTO): Promise<Groups> {
        const groupExist = await this.groupsRepository.findByCode(data.code);
        if (!groupExist) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Grupo não encontrado'
            }, HttpStatus.BAD_REQUEST);
        }

        await this.prismaService.groupsMembers.create({
            data: {
                groupId: groupExist.id,
                userId: user.userId,
            }

        })
        return groupExist;
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

    async delete(data: OutGroupDTO, user: UserTokenDTO): Promise<Groups> {
        const groupExist = await this.groupsRepository.findByCode(data.code);
        if (!groupExist) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Grupo não encontrado'
            }, HttpStatus.BAD_REQUEST);
        }
        const groupMembersFind = await this.findOne(user.userId, groupExist.id);
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

        return groupExist;
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