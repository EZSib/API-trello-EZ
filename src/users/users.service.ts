import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import { User} from "./users.models";
import {CreateUserDto} from "./dto/create-user-dto";
import {BanUserDto} from "./dto/ban-user-dto";

@Injectable()
export class UsersService {

    constructor(@InjectModel(User) private userRepository: typeof User) {}
    async createUser(dto: CreateUserDto) {
        const user = await this.userRepository.create(dto);
        return user;
    }
    async getAllUsers() {
        const users = await this.userRepository.findAll();
        return users

    }

    async getUserByEmail(email: string){
        const user = await this.userRepository.findOne({where: {email}, include: {all:true}})
        return user;
    }

    async ban(dto: BanUserDto) {
        const user = await this.userRepository.findByPk(dto.userId);
        if(!user){
            throw new HttpException('user not found', HttpStatus.NOT_FOUND);
        }
        user.banned = true;
        user.banReason = dto.banReason;
        await user.save();
        return user;
    }
}
