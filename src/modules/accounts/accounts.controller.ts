import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards, UseInterceptors } from "@nestjs/common";
import { AccountRepository } from "./accounts.repository";
import { CreateAccountDTO } from "./dto/createAccount.dto";
import { EditAccountDTO } from "./dto/editAccount.dto";
import { FilterAccountDTO } from "./dto/filterAccount.dto";
import { JwtAuthGuard } from "../authenticate/strategies/token.guard";

@UseGuards(JwtAuthGuard)
@Controller('/accounts')
export class AccountsController {
    constructor(private accountRepository: AccountRepository){ }

    @Post()
    async create(@Body() data: CreateAccountDTO ){
        const account = await this.accountRepository.create(data);
        return { 
            message: "Conta criada com sucesso  ",
            account,
        }
    }

    @Get()
    async list(){
        const accounts = await this.accountRepository.listAll();
        return {
            accounts,
        }
    } 

    @Put(":id") 
    async edit(@Param('id') id: string, @Body() data: EditAccountDTO){
        const account = await this.accountRepository.edit(id,data);
        return {
            message: "Conta alterada com sucesso",
            account,
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.accountRepository.delete(id);
        return {
            message: "Conta deletada com sucesso"
        }
    }
    @Get("/filter")
    async filter(@Query() data: FilterAccountDTO) {
        const accounts = await this.accountRepository.filter(data);
        return {
            accounts,
        }
    }
}
