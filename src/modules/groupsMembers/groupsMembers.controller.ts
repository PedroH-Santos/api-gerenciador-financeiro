import { Body, Controller, Post, UseGuards,Request, Get, Param } from "@nestjs/common";
import { JwtAuthGuard } from "src/modules/authenticate/strategies/token.guard";
import { JoinGroupDTO } from "./dto/joinGroup.dto";
import { OutGroupDTO } from "./dto/outGroup.dto";
import { GroupsMembersService } from "./groupsMembers.service";




@UseGuards(JwtAuthGuard)
@Controller('/groups/members')
export class GroupsMembersController {
    constructor(private groupsMembersService: GroupsMembersService) { }
    @Post("/join")
    async join(@Body() data: JoinGroupDTO, @Request() req: any) {
        const group = await this.groupsMembersService.join(data, req.user);
        return {
            message: "Usuário entrou no grupo com sucesso",
            group,
        }
    }

    @Post("/out")
    async out(@Body() data: OutGroupDTO, @Request() req: any) {
        const group = await this.groupsMembersService.out(data, req.user);
        return {
            message: "Usuário saiu do grupo com sucesso",
            group,
        }
    }

    @Get("/:groupId")
    async listAllMembers(@Param("groupId") groupId: string) {
        const members = await this.groupsMembersService.listAllMembers(groupId);
        return {
            members,
            message: "Todos os membros foram retornados"
        }
    }
}
