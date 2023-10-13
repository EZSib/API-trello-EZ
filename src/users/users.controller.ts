import {Controller, Body, Post, Get, } from '@nestjs/common';
import {CreateUserDto} from "./dto/create-user-dto";
import {UsersService} from "./users.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./users.models";
import {BanUserDto} from "./dto/ban-user-dto";

@ApiTags('UsersApi')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {
    }

    @ApiOperation({summary: 'Create user'})
    @ApiResponse({status: 200, type: User})
    @Post()
    create(@Body() dto: CreateUserDto) {
        return this.usersService.createUser(dto);
    }

    @ApiOperation({summary: 'Get all users'})
    @ApiResponse({status: 200, type: [User]})
    @Get()
    getAll() {
        return this.usersService.getAllUsers();
    }

    @ApiOperation({summary: 'Ban user'})
    @ApiResponse({status: 200, type: User})
    @Post('/ban')
    ban(@Body() dto: BanUserDto) {
        return this.usersService.ban(dto);

    }
}
