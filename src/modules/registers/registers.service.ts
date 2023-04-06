import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { Registers } from "@prisma/client";

import { RegistersRepository } from "./registers.repository";
import { CreateRegisterDTO } from "./dto/createRegister.dto";
import { EditRegisterDTO } from "./dto/editRegister.dto";
import { FilterRegisterDTO } from "./dto/filterRegister.dto";

@Injectable()
export class RegistersService {
    constructor(private registersRepository: RegistersRepository) { }

    
    async create(data: CreateRegisterDTO):Promise<Registers> {
        const register = await this.registersRepository.create(data);
        return register;
    }



    async edit(id: string, data: EditRegisterDTO): Promise<Registers> {
        const registerFind = await this.registersRepository.findOne(id);
        if (!registerFind) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Registro não encontrado'
            }, HttpStatus.BAD_REQUEST);
        }
        const register = await this.registersRepository.edit(id, data);
        return register;
    }

    async delete( id: string): Promise<Registers> {
        const registerFind = await this.registersRepository.findOne(id);
        if (!registerFind) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Registro não encontrado'
            }, HttpStatus.BAD_REQUEST);
        }
        const register = await this.registersRepository.delete(id);
        return register;
    }
    
    async filter(data: FilterRegisterDTO): Promise<Registers[]> {
        const registers = await this.registersRepository.filter(data);
        return registers;
    }

    
    async list( groupId: string): Promise<Registers[]> {
        const registers = await this.registersRepository.listAll(groupId);
        return registers;
    }
}