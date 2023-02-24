import { Body, Controller, Post, UseGuards,Request } from "@nestjs/common";
import { JwtAuthGuard } from "src/modules/authenticate/strategies/token.guard";
import { JoinGroupDTO } from "./dto/joinGroup.dto";
import { GroupsMembersRepository } from "./groupsMembers.repository";




@UseGuards(JwtAuthGuard)
@Controller('/groups/members')
export class GroupsMembersController {
    constructor(private groupsMembersRepository: GroupsMembersRepository) { }
    @Post("/join")
    async join(@Body() data: JoinGroupDTO, @Request() req: any) {
        const group = await this.groupsMembersRepository.create(data, req.user);
        return {
            message: "Usuário entrou no grupo com sucesso",
            group,
        }
    }
}
