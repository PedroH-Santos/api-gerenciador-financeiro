import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { CreateRegisterDTO } from "./dto/createRegister.dto";
import { EditRegisterDTO } from "./dto/editRegister.dto";
import { RegistersRepository } from "./registers.repository";
import { FilterRegisterDTO } from "./dto/filterRegister.dto";



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
    @Get()
    async list() {
        const registers = await this.registersRepository.listAll();
        return {
            registers,
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
        await this.registersRepository.delete(id);
        return {
            message: "Registro deletado com sucesso"
        }
    }

    @Get("/filter")
    async filter(@Query() data: FilterRegisterDTO) {
        const registers = await this.registersRepository.filter(data);
        return {
            registers,
        }
    }
}
