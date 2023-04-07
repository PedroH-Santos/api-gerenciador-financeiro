import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors, Request } from "@nestjs/common";
import { AccountRepository } from "./accounts.repository";
import { CreateAccountDTO } from "./dto/createAccount.dto";
import { EditAccountDTO } from "./dto/editAccount.dto";
import { FilterAccountDTO } from "./dto/filterAccount.dto";
import { JwtAuthGuard } from "../authenticate/strategies/token.guard";
import { AccountsService } from "./accounts.service";

@UseGuards(JwtAuthGuard)
@Controller('/accounts')
export class AccountsController {
    constructor(private accountsService: AccountsService){ }

    @Post()
    async create(@Body() data: CreateAccountDTO ){
        const account = await this.accountsService.create(data);
        return { 
            message: "Conta criada com sucesso  ",
            account,
        }
    }


    @Put(":id") 
    async edit(@Param('id') id: string, @Body() data: EditAccountDTO){
        const account = await this.accountsService.edit(id,data);
        return {
            message: "Conta alterada com sucesso",
            account,
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        const account = await this.accountsService.delete(id);
        return {
            message: "Conta deletada com sucesso",
            account,
        }
    }
    @Get("/filter")
    async filter(@Query() data: FilterAccountDTO) {
        const accounts = await this.accountsService.filter(data);
        return {
            accounts,
        }
    }



    @Get(":groupId")
    async listAllByGroupId(@Param("groupId") groupId: string) {
        const accounts = await this.accountsService.listAllByGroupId(groupId);
        return {
            accounts,
            message: "Todas as contas foram retornadas com sucesso"
        }
    }


}
