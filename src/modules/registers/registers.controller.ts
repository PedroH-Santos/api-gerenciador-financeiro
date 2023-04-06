import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { CreateRegisterDTO } from "./dto/createRegister.dto";
import { EditRegisterDTO } from "./dto/editRegister.dto";
import { FilterRegisterDTO } from "./dto/filterRegister.dto";
import { JwtAuthGuard } from "../authenticate/strategies/token.guard";
import { RegistersService } from "./registers.service";


@UseGuards(JwtAuthGuard)
@Controller('/registers')
export class RegisterController {
    constructor(private registersService: RegistersService){}

    @Post()
    async create(@Body() data: CreateRegisterDTO) {
        const register = await this.registersService.create(data);
        return {
            message: "Registro criado com sucesso  ",
            register,
        }
    }


    @Put(":id")
    async edit(@Param('id') id: string, @Body() data: EditRegisterDTO) {
        const register = await this.registersService.edit(id, data);
        return {
            message: "Registro alterado com sucesso",
            register,
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        const register = await this.registersService.delete(id);
        return {
            register,
            message: "Registro deletado com sucesso"
        }
    }
    @Get("/filter")
    async filter(@Query() data: FilterRegisterDTO) {
        const registers = await this.registersService.filter(data);
        return {
            registers,
            message: "Listagem de Registros com filtro parametrizado !"
        }
    }

    @Get(":groupId")
    async list(@Param('groupId') groupId: string) {
        const registers = await this.registersService.list(groupId);
        return {
            registers,
            message: "Listagem de Registros por grupo !"
        }
    }


}
