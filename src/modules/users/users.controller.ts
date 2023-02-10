import { Body, Controller, Post } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { CreateUserDTO } from "./dto/createUser.dto";

@Controller('/users')
export class UsersController {
    constructor(private usersRepository: UsersRepository){ }

    @Post()
    async create(@Body() data: CreateUserDTO ){
        console.log('entriu');
        const user = await this.usersRepository.create(data);
        return { 
            message: "Usuário criado com sucesso",
            user,
        }
    }
}
