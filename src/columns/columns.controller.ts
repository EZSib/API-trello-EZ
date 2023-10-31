import {
    Body,
    Controller,
    Get,
    Injectable,
    Post,
    UseGuards,
    Headers,
    Param,
    Put,
} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {ColumnsService} from "./columns.service";
import {UserColumn} from "./columns.models"
import {CreateColumnDto} from "./dto/create-column-dto";
import {JwtAuthGuards} from "../auth/jwt.auth.guards";
import {UpdateColumnDto} from "./dto/update-column-dto";
import {OwnershipGuard} from "../auth/owner-guards";

@Controller('users')
@ApiTags('ColumnsApi')

@Injectable()
export class ColumnsController {

    constructor(private columnsService: ColumnsService) {
    }

    @ApiOperation({summary: 'Find column by id'})
    @ApiResponse({status: 200, type: UserColumn})
    @Get('columns/:columnsId')
    @UseGuards(JwtAuthGuards)
    getCard(@Param() params: any) {
        return this.columnsService.getColumn(params.columnsId);
    }

    @ApiOperation({summary: 'User Columns'})
    @ApiResponse({status: 200, type: [UserColumn]})
    @Get(':userId/columns')
    @UseGuards(JwtAuthGuards)
    AllUserCol(@Param() params: any) {
        return this.columnsService.getUserColumns(params.userId);
    }

    @ApiOperation({summary: 'update column'})
    @ApiResponse({status: 200, type: UserColumn})
    @Put('/columns/update/:columnId')
    @UseGuards(OwnershipGuard)
    update(@Body() dto: UpdateColumnDto,
           @Param() params:any) {
        return this.columnsService.updateColumn(dto, params.columnId);
    }

    @ApiOperation({summary: 'archive column'})
    @ApiResponse({status: 200, type: UserColumn})
    @Put('/columns/archive/:columnId')
    @UseGuards(OwnershipGuard)
    archive(@Param() params :any ) {
        return this.columnsService.archiveColumn(params.columnId);
    }

    @ApiOperation({summary: 'unarchive column'})
    @ApiResponse({status: 200, type: UserColumn})
    @Put('/columns/unarchive/:columnId')
    @UseGuards(OwnershipGuard)
    unarchive(@Param() params :any ) {
        return this.columnsService.unarchiveColumn(params.columnId);
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



