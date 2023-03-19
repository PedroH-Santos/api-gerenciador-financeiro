import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { CreateRegisterDTO } from "./dto/createRegister.dto";
import { EditRegisterDTO } from "./dto/editRegister.dto";
import { RegistersRepository } from "./registers.repository";
import { FilterRegisterDTO } from "./dto/filterRegister.dto";
import { JwtAuthGuard } from "../authenticate/strategies/token.guard";


@UseGuards(JwtAuthGuard)
@Controller('/registers')
export class RegisterController {
    constructor(private registersRepository: RegistersRepository){}

    @Post()
    async create(@Body() data: CreateRegisterDTO) {
        const register = await this.registersRepository.create(data);
        return {
            message: "Registro criado com sucesso  ",
            register,
        }
    }


    @Put(":id")
    async edit(@Param('id') id: string, @Body() data: EditRegisterDTO) {
        const register = await this.registersRepository.edit(id, data);
        return {
            message: "Registro alterado com sucesso",
            register,
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        const register = await this.registersRepository.delete(id);
        return {
            register,
            message: "Registro deletado com sucesso"
        }
    }

    @Get(":groupId")
    async list(@Param('groupId') groupId: string) {
        const registers = await this.registersRepository.listAll(groupId);
        return {
            registers,
        }
    }
}
