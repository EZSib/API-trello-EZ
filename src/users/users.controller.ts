import {Controller, Body, Post, Get, Param, UseGuards,} from '@nestjs/common';
import {UsersService} from "./users.service";
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "./users.models";
import {BanUserDto} from "./dto/ban-user-dto";
import {JwtAuthGuards} from "../auth/jwt.auth.guards";
import {OwnershipGuard} from "../auth/owner-guards";


@ApiTags('UsersApi')
@Controller('users')
export class UsersController {

    constructor(private usersService: UsersService) {
    }


    @ApiOperation({summary: 'Get all users'})
    @ApiResponse({status: 200, type: [User]})
    @Get()
    @UseGuards(JwtAuthGuards)
    getAll() {
        return this.usersService.getAllUsers();
    }

    @ApiOperation({summary: 'Get user by id'})
    @ApiResponse({status: 200, type: User})
    @Get('/:id')
    @UseGuards(JwtAuthGuards)
    getByValue(@Param('id') id: number) {
        return this.usersService.getUserByUserId(id);


    }
    @ApiOperation({summary: 'Ban user'})
    @ApiResponse({status: 200, type: User})
    @UseGuards(JwtAuthGuards)
    @UseGuards(OwnershipGuard)
    @Post('/ban')
    ban(@Body() dto: BanUserDto) {
        return this.usersService.ban(dto);

    }
}
