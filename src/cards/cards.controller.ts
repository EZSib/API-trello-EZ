import {Body, Controller, Headers, Post, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {JwtAuthGuards} from "../auth/jwt.auth.guards";
import {UserCard} from "./cards.models";
import {CardsService} from "./cards.service";
import {CreateCardDto} from "./dto/create-card-dto";

@Controller('users')
export class CardsController {
    constructor(private cardsService: CardsService) {
    }

    @ApiOperation({summary: 'Create post'})
    @ApiResponse({status: 200, type: UserCard})
    @Post('/Cards/create')
    @UseGuards(JwtAuthGuards)
    create(@Headers('Authorization') headers:string,
           @Body() dto: CreateCardDto) {
        return this.cardsService.createCard(headers, dto);

    }
}
