import {Body, Controller, Delete, Get, Headers, Param, Post, Put, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuards} from "../auth/jwt.auth.guards";
import {UserCard} from "./cards.models";
import {CardsService} from "./cards.service";
import {CreateCardDto} from "./dto/create-card-dto";
import {UserComment} from "../comments/comments.models";
import {CreateCommentDto} from "../comments/dto/create-comment-dto";
import {UpdateCommentDto} from "../comments/dto/update-comment-dto";
import {UpdateCardDto} from "./dto/update-card-dto";
import {UserColumn} from "../columns/columns.models";
import {OwnershipGuard} from "../auth/owner-guards";

@Controller('users')
@ApiTags('CardsApi')
export class CardsController {
    constructor(private cardsService: CardsService) {
    }

    @ApiOperation({summary: 'User Cards'})
    @ApiResponse({status: 200, type: [UserColumn]})
    @Get(':userId/cards')
    @UseGuards(JwtAuthGuards)
    AllUserCards(@Param() params: any) {
        return this.cardsService.getUserCards(params.userId);
    }

    @ApiOperation({summary: 'Find card by id'})
    @ApiResponse({status: 200, type: UserCard})
    @Get('cards/:cardId')
    @UseGuards(JwtAuthGuards)
    getCard(@Param() params: any) {
        return this.cardsService.getCard(params.cardId);
    }

    @ApiOperation({summary: 'Cards on Columns'})
    @ApiResponse({status: 200, type: [UserCard]})
    @Get('cards/:listId/lists')
    @UseGuards(JwtAuthGuards)
    getAllOnCard(@Param() params: any) {
        return this.cardsService.getCardOnColumn(params.listId);
    }

    @ApiOperation({summary: 'update card'})
    @ApiResponse({status: 200, type: UserCard})
    @Put('/cards/update/')
    @UseGuards(OwnershipGuard)
    update(@Body() dto: UpdateCardDto) {
        return this.cardsService.updateCard(dto);
    }


    @ApiOperation({summary: 'delete card'})
    @ApiResponse({status: 200, type: UserCard})
    @Delete('/cards/:cardId/delete')
    @UseGuards(JwtAuthGuards)
    delete(@Param() params :any ) {
        return this.cardsService.deleteCard(params.cardId);
    }

    @ApiOperation({summary: 'Create card'})
    @ApiResponse({status: 200, type: UserCard})
    @Post('/Cards/create')
    @UseGuards(JwtAuthGuards)
    create(@Headers('Authorization') headers:string,
           @Body() dto: CreateCardDto) {
        return this.cardsService.createCard(headers, dto);
    }

}
