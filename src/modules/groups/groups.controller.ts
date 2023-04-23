import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UseGuards } from "@nestjs/common";
import { CreateGroupDTO } from "./dto/createGroup.dto";
import { EditGroupDTO } from "./dto/editGroup.dto";
import { FilterGroupsDTO } from "./dto/filterGroups.dto";
import { JwtAuthGuard } from "../authenticate/strategies/token.guard";
import { GroupsService } from "./groups.service";




@UseGuards(JwtAuthGuard)
@Controller('/groups')
export class GroupController {
    constructor(private groupsService: GroupsService){}

    @Post()
    async create(@Body() data: CreateGroupDTO, @Request() req: any) {
        const group = await this.groupsService.create(data,req.user);
        return {
            message: "Grupo criado com sucesso",
            group,
        }
    }

    @Get()
    async list(@Request() req: any) {
        const groups = await this.groupsService.list(req.user);
        return {
            groups,
        }
    }



    @Put(":id")
    async edit(@Param('id') id: string, @Body() data: EditGroupDTO) {
        const group = await this.groupsService.edit(id, data);
        return {
            message: "Grupo alterado com sucesso",
            group,
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.groupsService.delete(id);
        return {
            message: "Grupo deletado com sucesso"
        }
    }
    @Get("/filter")
    async filter(@Query() data: FilterGroupsDTO, @Request() req: any) {
        const groups = await this.groupsService.filter(data,req.user);
        return {
            groups,
        }
    }
    @Get("/one/:id")
    async getOne(@Param('id') id: string) {
        const group = await this.groupsService.getOne(id);
        return {
            group,
        }
    }
}
