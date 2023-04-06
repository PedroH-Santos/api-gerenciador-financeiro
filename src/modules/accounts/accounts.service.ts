import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { AccountRepository } from "./accounts.repository";
import { CreateAccountDTO } from "./dto/createAccount.dto";
import { EditAccountDTO } from "./dto/editAccount.dto";
import { FilterAccountDTO } from "./dto/filterAccount.dto";
import { Accounts } from "@prisma/client";

@Injectable()
export class AccountsService {
    constructor(private accountRepository: AccountRepository) { }

    async create(data: CreateAccountDTO): Promise<Accounts> {
        const account = await this.accountRepository.create(data);
        return account;
    }


    async edit(id: string, data: EditAccountDTO): Promise<Accounts> {
        const accountFind = await this.accountRepository.findOne(id);
        if (!accountFind) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error:  'Usuário não encontrado'
            }, HttpStatus.BAD_REQUEST);
        }
        
        const account = await this.accountRepository.edit(id, data);
        return account;
    }

    async delete( id: string) {
        const accountFind = await this.accountRepository.findOne(id);
        if (!accountFind) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Usuário não encontrado'
            }, HttpStatus.BAD_REQUEST);
        }
        await this.accountRepository.delete(id);
        
    }
    async filter(data: FilterAccountDTO): Promise<Accounts[]> {
        const accounts = await this.accountRepository.filter(data);
        return accounts;
    }



    async listAllByGroupId(groupId: string): Promise<Accounts[]> {
        const accounts = await this.accountRepository.listByGroup(groupId);
        return accounts;
    }


}
