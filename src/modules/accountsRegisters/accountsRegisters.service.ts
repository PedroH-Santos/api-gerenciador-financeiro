import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put, Query, UseGuards, UseInterceptors, Request, Injectable } from "@nestjs/common";
import { AccountRegistersRepository } from "./accountsRegisters.repository";
import { JwtAuthGuard } from "../authenticate/strategies/token.guard";
import { EditAccountsRegistersDTO } from "./dto/editAccountsRegisters.dto";
import { AccountsRegisters, StatusAccount } from "@prisma/client";
import { FilterAccountDTO } from "../accounts/dto/filterAccount.dto";
import { CreateAccountsRegistersDTO } from "./dto/CreateAccountsRegisters.dto";
import { AccountsService } from "../accounts/accounts.service";
import { FilterAccountsRegistersDTO } from "./dto/filterAccount.dto";
import { EditAccountDTO } from "../accounts/dto/editAccount.dto";

@Injectable()
export class AccountsRegistersService {
    constructor(
        private accountRegistersRepository: AccountRegistersRepository,
        private accountsService: AccountsService
        ) { }

   
    async create(groupId: string) {
        const filter: FilterAccountDTO = { groupId: groupId };
        const accounts = await this.accountsService.filter(filter);
        const accountsRegisters = await this.accountRegistersRepository.getRegistersByMonth(groupId);

        accounts.forEach(account => {
            const findRegisterInMonth = accountsRegisters.find(register => register.accountId == account.id);
            if (!findRegisterInMonth) {
                const dueDateNow = new Date((new Date().getMonth() + 1) + '/' + account.dayDueDate + "/" + new Date().getFullYear()).toISOString();
                const newRegister: CreateAccountsRegistersDTO = {
                    accountId: account.id,
                    dueDate: dueDateNow,
                    price: account.priceInstallments,
                    installments: account.installments
                };
                this.accountRegistersRepository.create(newRegister);
            }
        });
        
        
    }


    async updateStatus(groupId: string) {
        const filter: FilterAccountDTO = { groupId: groupId };
        const accounts = await this.accountsService.filter(filter);
        accounts.forEach(async account => {
            const filterRegisterNotPayed: FilterAccountsRegistersDTO = {
                accountId: account.id,
                status: [StatusAccount.LATED, StatusAccount.PENDING]
            }
            const filterRegisterPayed: FilterAccountsRegistersDTO = {
                accountId: account.id,
                status: [StatusAccount.PAYED]
            }
            const accountsRegisterNotPayed = await this.accountRegistersRepository.filter(filterRegisterNotPayed);
            const accountsRegisterPayed = await this.accountRegistersRepository.filter(filterRegisterPayed);
            accountsRegisterNotPayed.forEach(async (register) => {
                if (new Date() > register.dueDate) {
                    const editRegister: EditAccountsRegistersDTO = {
                        status: StatusAccount.LATED,
                    }
                    await this.edit(register.id, editRegister);
                }
            })
            if (accountsRegisterPayed.length == account.installments) {
                const editAccount: EditAccountDTO = {
                    status: StatusAccount.PAYED,
                }
                await this.accountsService.edit(account.id, editAccount);
            }

        })



    }

   
    async edit(registerId: string,data: EditAccountsRegistersDTO): Promise<AccountsRegisters> {
        const accountRegisterFind = await this.accountRegistersRepository.findOne(registerId);
        if (!accountRegisterFind) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Registro de conta não encontrado'
            }, HttpStatus.BAD_REQUEST);
        }
        const register = await this.accountRegistersRepository.edit(registerId, data);
        return register;
    }

    async delete(id: string){
        const accountRegisterFind = await this.accountRegistersRepository.findOne(id);
        if (!accountRegisterFind) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Registro de conta não encontrado'
            }, HttpStatus.BAD_REQUEST);
        }
        await this.accountRegistersRepository.delete(id);

    }


    async listAllByGroupId(groupId: string): Promise<AccountsRegisters[]> {
        const registers = await this.accountRegistersRepository.listByGroup(groupId);
        return registers;
    }

}
