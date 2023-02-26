import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseInterceptors } from "@nestjs/common";
import { AccountRegistersRepository } from "./accountsRegisters.repository";


@Controller('/accounts/registers')
export class AccountsRegistersController {
    constructor(private accountRegistersRepository: AccountRegistersRepository) { }

    @Post(":groupId")
    async create(@Param('groupId') groupId: string) {
       await this.accountRegistersRepository.createRegister(groupId);
        return {
            message: "Registros de contas criadas com sucesso no mês  ",
        }
    }



}
