import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { CreateRegisterDTO } from "./dto/createRegister.dto";
import { EditRegisterDTO } from "./dto/editRegister.dto";
import { RegistersRepository } from "./registers.repository";
import { FilterRegisterDTO } from "./dto/filterRegister.dto";
import { JwtAuthGuard } from "../authenticate/strategies/token.guard";



@Controller('/register/filter')
export class RegisterFilterController {
    constructor(private registersRepository: RegistersRepository) { }

    @Get()
    async filter(@Query() data: FilterRegisterDTO) {
        const registers = await this.registersRepository.filter(data);
        return {
            registers,
        }
    }

}
