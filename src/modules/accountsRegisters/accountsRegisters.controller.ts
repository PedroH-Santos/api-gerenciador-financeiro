import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, UseGuards, UseInterceptors, Request } from "@nestjs/common";
import { AccountRegistersRepository } from "./accountsRegisters.repository";
import { JwtAuthGuard } from "../authenticate/strategies/token.guard";
import { EditAccountsRegistersDTO } from "./dto/editAccountsRegisters.dto";
import { AccountsRegistersService } from "./accountsRegisters.service";

@UseGuards(JwtAuthGuard)
@Controller('/accounts/registers')
export class AccountsRegistersController {
    constructor(private accountsRegistersService: AccountsRegistersService) { }

    @Post("/create/:groupId")
    async create(@Param("groupId") groupId: string) {
        await this.accountsRegistersService.create(groupId);
        return {
            message: "Registros de contas criadas com sucesso no mês  ",
        }
    }

    @Put("/status/:groupId")
    async updateStatus(@Param("groupId") groupId: string) {
        await this.accountsRegistersService.updateStatus(groupId);
        return {
            message: "Status das contas alteradas com sucesso no mês  ",
        }
    }

    @Put(":registerId")
    async edit(@Param('registerId') registerId: string,@Body() data: EditAccountsRegistersDTO) {
        const register = await this.accountsRegistersService.edit(registerId, data);
        return {
            register,
            message: "Registro da conta alterado com sucesso  ",
        }
    }


    @Get(":groupId")
    async listAllByGroupId(@Param("groupId") groupId: string) {
        const registers = await this.accountsRegistersService.listAllByGroupId(groupId);
        return {
            registers,
            message: "Todos os registros foram retornados com sucesso"
        }
    }

}
