import { Body, Controller, Delete, Get, Injectable, Param, Post, Put, Query, Request, UseGuards } from "@nestjs/common";
import { CreateGroupDTO } from "./dto/createGroup.dto";
import { EditGroupDTO } from "./dto/editGroup.dto";
import { GroupRepository } from "./groups.repository";
import { FilterGroupsDTO } from "./dto/filterGroups.dto";
import { JwtAuthGuard } from "../authenticate/strategies/token.guard";



@Injectable()
export class GroupsService {
    constructor(private groupsRepository: GroupRepository) { }

    
    async create(data: CreateGroupDTO, user: any) {
        const group = await this.groupsRepository.create(data, user);
        return group;
    }

 
    async list(user: any) {
        const groups = await this.groupsRepository.listAll(user);
        return groups;
    }



    
    async edit(id: string, data: EditGroupDTO) {
        const group = await this.groupsRepository.edit(id, data);
        return group;
    }


    async delete( id: string) {
        await this.groupsRepository.delete(id);
        
    }
 
    async filter(data: FilterGroupsDTO) {
        const groups = await this.groupsRepository.filter(data);
        return groups;
    }
   
    async getOne( id: string) {
        const group = await this.groupsRepository.findOne(id);
        return group;
    }
}
