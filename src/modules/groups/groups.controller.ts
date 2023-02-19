import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { CreateGroupDTO } from "./dto/createGroup.dto";
import { EditGroupDTO } from "./dto/editGroup.dto";
import { GroupRepository } from "./groups.repository";
import { FilterGroupsDTO } from "./dto/filterGroups.dto";




@Controller('/groups')
export class GroupController {
    constructor(private groupsRepository: GroupRepository){}

    @Post()
    async create(@Body() data: CreateGroupDTO) {
        const group = await this.groupsRepository.create(data);
        return {
            message: "Grupo criado com sucesso  ",
            group,
        }
    }
    @Get()
    async list() {
        const groups = await this.groupsRepository.listAll();
        return {
            groups,
        }
    }

    @Get("/:id")
    async listOne(@Param('id') id: string) {
        const group = await this.groupsRepository.findOne(id);
        return {
            group,
        }
    }

    @Put(":id")
    async edit(@Param('id') id: string, @Body() data: EditGroupDTO) {
        const group = await this.groupsRepository.edit(id, data);
        return {
            message: "Grupo alterado com sucesso",
            group,
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.groupsRepository.delete(id);
        return {
            message: "Grupo deletado com sucesso"
        }
    }
    @Get("/filter")
    async filter(@Query() data: FilterGroupsDTO) {
        const groups = await this.groupsRepository.filter(data);
        return {
            groups,
        }
    }
}
