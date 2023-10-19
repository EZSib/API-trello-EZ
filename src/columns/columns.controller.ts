import {Body, Controller, Get, Post} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {User} from "../users/users.models";
import {ColumnsService} from "./columns.service";
import {UserColumn} from "./columns.models"
import {CreateColumnDto} from "./dto/create-column-dto";
@Controller('users')
@ApiTags('ColumnsApi')

export class ColumnsController {

    constructor(private columnsService: ColumnsService) {
    }

    @ApiOperation({summary: 'Create post'})
    @ApiResponse({status: 200, type: UserColumn})
    @Post('/columns')
    create(@Body() dto: CreateColumnDto) {
        return this.columnsService.createColumn(dto);

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



