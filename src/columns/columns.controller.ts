import {Body, Controller, Get, Injectable, Post, UseGuards,Header,Headers, Req} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "../users/users.models";
import {ColumnsService} from "./columns.service";
import {UserColumn} from "./columns.models"
import {CreateColumnDto} from "./dto/create-column-dto";
import {JwtAuthGuards} from "../auth/jwt.auth.guards";
@Controller('users')
@ApiTags('ColumnsApi')

@Injectable()
export class ColumnsController {

    constructor(private columnsService: ColumnsService) {
    }

    @ApiOperation({summary: 'Create columns'})
    @ApiResponse({status: 200, type: UserColumn})
    @Post('/columns/create')
    @UseGuards(JwtAuthGuards)
    create(@Headers('Authorization') headers:string,
           @Body() dto: CreateColumnDto) {
        return this.columnsService.createColumn(headers, dto);

    }

}
    //
    // @ApiOperation({summary: 'Get all users'})
    // @ApiResponse({status: 200, type: [User]})
    // @Get()
    // getAll() {
    //     return this.usersService.getAllUsers();
    // }
    //
    // @ApiOperation({summary: 'Ban user'})
    // @ApiResponse({status: 200, type: User})
    // @Post('/ban')
    // ban(@Body() dto: BanUserDto) {
    //     return this.usersService.ban(dto);



