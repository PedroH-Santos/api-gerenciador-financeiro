import { Injectable, HttpStatus, HttpException, forwardRef, Inject } from "@nestjs/common";
import { JoinGroupDTO } from "./dto/joinGroup.dto";
import { GroupsMembersRepository } from "./groupsMembers.repository";
import { OutGroupDTO } from "./dto/outGroup.dto";
import { Groups, GroupsMembers } from "@prisma/client";
import { UserTokenDTO } from "../authenticate/dto/userToken.dto";
import { GroupRepository } from "../groups/groups.repository";




@Injectable()
export class GroupsMembersService {
    constructor(private groupsMembersRepository: GroupsMembersRepository,
        @Inject(forwardRef(() => GroupRepository))
        private groupsRepository: GroupRepository
        ) { }


    async join(data: JoinGroupDTO, user: any): Promise<Groups> {
        const groupExist = await this.groupsRepository.findByCode(data.code);
        if (!groupExist) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Grupo não encontrado'
            }, HttpStatus.BAD_REQUEST);
        }
        await this.groupsMembersRepository.create(groupExist.id,user);
        return groupExist;
    }

   
    async out(data: OutGroupDTO, user: any): Promise<Groups> {
        const group = await this.delete(data, user);
        return group;
    }

    
    async listAllMembers(groupId: string): Promise<GroupsMembers[]> {
        const members = await this.groupsMembersRepository.listAllByGroup(groupId);
        return members;
    }

    async delete(data: OutGroupDTO, user: UserTokenDTO): Promise<Groups> {
        const groupExist = await this.groupsRepository.findByCode(data.code);
        if (!groupExist) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Grupo não encontrado'
            }, HttpStatus.BAD_REQUEST);
        }
        const groupMembersFind = await this.groupsMembersRepository.findOne(user.userId, groupExist.id);
        if (!groupMembersFind) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Usuário não encontrado nesse grupo'
            }, HttpStatus.BAD_REQUEST);
        }
        return groupExist;
    }
}
