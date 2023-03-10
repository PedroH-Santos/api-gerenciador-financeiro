import { HttpException, HttpStatus, Inject, Injectable, forwardRef } from '@nestjs/common';
import { PrismaService } from '../../database/service/prisma.service';
import { Groups } from '@prisma/client';
import { CreateGroupDTO } from './dto/createGroup.dto';
import { generate } from 'shortid';
import { EditGroupDTO } from './dto/editGroup.dto';
import { FilterGroupsDTO } from './dto/filterGroups.dto';
import { UserTokenDTO } from '../authenticate/dto/userToken.dto';
import { GroupsMembersRepository } from '../groupsMembers/groupsMembers.repository';
import { JoinGroupDTO } from '../groupsMembers/dto/joinGroup.dto';


@Injectable()
export class GroupRepository {
    constructor(private prismaService: PrismaService, 
        @Inject(forwardRef(() => GroupsMembersRepository))
        private groupsMembersRepository: GroupsMembersRepository) { }

    async create(data: CreateGroupDTO, user: UserTokenDTO): Promise<Groups> {
        const code  = generate();
        const groupCreated = await this.prismaService.groups.create({
            data: {
                name: data.name,
                code: code,
                creatorId: user.userId
      
            },
            include: {
                creator: {
                    select: {
                        name: true,
                    }
                }
            }
        })
        const params: JoinGroupDTO =  {
            code: groupCreated.code
        }
        await this.groupsMembersRepository.create(params,user);

        return groupCreated;
    }


    async listAll(user: UserTokenDTO): Promise<Groups[]> {
        const groups = await this.prismaService.groups.findMany({
            where: {
                GroupsMembers: {
                    some: {
                        userId: user.userId
                    }
                }
            },
            include: {
                creator: {
                    select: {
                        name: true,
                    }
                }
                
            }
        });
        return groups;
    }

    async findOne(id: string): Promise<Groups> {
        const group = await this.prismaService.groups.findFirst({
            where: { id: id },
            include: {
                creator: {
                    select: {
                        name: true,
                    }
                }

            }
        });
        return group;
    }

    async findByCode(code: string): Promise<Groups>{
        const group = await this.prismaService.groups.findFirst({
            where: { code: code },
            include: {
                creator: {
                    select: {
                        name: true,
                    }
                }

            }
        });
        return group; 
    }

    async edit(id: string, data: EditGroupDTO): Promise<Groups> {
        const groupFind = await this.findOne(id);
        if (!groupFind) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Grupo não encontrado'
            }, HttpStatus.BAD_REQUEST);
        }

        const group = await this.prismaService.groups.update({
            data: data,
            where: { id: id },
        })
        return group;
    }

    async delete(id: string) {
        const groupFind = await this.findOne(id);
        if (!groupFind) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Grupo não encontrado'
            }, HttpStatus.BAD_REQUEST);
        }

        await this.prismaService.groups.delete({
            where: { id: id },
        })
    }

    async filter(data: FilterGroupsDTO): Promise<Groups[]> {
        const groups = await this.prismaService.groups.findMany({
            where: {
                name: {
                    contains: data.name
                },
                code: {
                    equals: data.code
                }
            },
            include: {
                creator: {
                    select: {
                        name: true,
                    }
                }
            }

        })
        return groups;
    }





}