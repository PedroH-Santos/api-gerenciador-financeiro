import { Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { CreateUserDTO } from "./dto/createUser.dto";
import { EditUserDTO } from "./dto/editUser.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { UploadedFile } from "@nestjs/common/decorators";
import { multerUploadOptions } from "src/config/multer.config";

@Controller('/users')
export class UsersController {
    constructor(private usersRepository: UsersRepository){ }

    @Post()
    async create(@Body() data: CreateUserDTO ){
        const user = await this.usersRepository.create(data);
        return { 
            message: "Usuário criado com sucesso  ",
            user,
        }
    }

    @Post('/upload/image')
    @UseInterceptors(FileInterceptor('file', multerUploadOptions))
    async uploadImage(@UploadedFile() file: Express.Multer.File) {
        return {
            message: "Imagem do usuário cadastrada com sucesso",
            file,
        }
    }

    @Get()
    async list(){
        const users = await this.usersRepository.listAll();
        return {
            users,
        }
    } 

    @Put(":id") 
    async edit(@Param('id') id: string, @Body() data: EditUserDTO){
        const user = await this.usersRepository.edit(id,data);
        return {
            message: "Usuário modificado com sucesso",
            user,
        }
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        await this.usersRepository.delete(id);
        return {
            message: "Usuário deletado com sucesso"
        }
    }
}
