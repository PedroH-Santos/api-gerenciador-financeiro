import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import { CreateUserDTO } from "./dto/createUser.dto";
import { Users } from "@prisma/client";
import { EditUserDTO } from "./dto/editUser.dto";

@Injectable()
export class UsersService {
    constructor(private usersRepository: UsersRepository) { }

    
    async create(data: CreateUserDTO): Promise<Users> {
        const user = await this.usersRepository.create(data);
        return user;
    }


    async list(): Promise<Users[]> {
        const users = await this.usersRepository.listAll();
        return users;
        
    }

    async getOne(id: string): Promise<Users> {
        const user = await this.usersRepository.findOne(id);
        return user;
    }


    async edit( id: string,  data: EditUserDTO): Promise<Users> {
        const userFind = await this.usersRepository.findOne(id);
        if (!userFind) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Usuário não encontrado'
            }, HttpStatus.BAD_REQUEST);
        }
        const user = await this.usersRepository.edit(id, data);
        return user;
    }

    async delete( id: string) {
        const userFind = await this.usersRepository.findOne(id);
        if (!userFind) {
            throw new HttpException({
                status: HttpStatus.BAD_REQUEST,
                error: 'Usuário não encontrado'
            }, HttpStatus.BAD_REQUEST);
        }
        await this.usersRepository.delete(id);
        
    }
}