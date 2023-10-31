import {Body, Controller, Delete, Get, Headers, Param, Post, Put, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiProperty, ApiResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuards} from "../auth/jwt.auth.guards";
import {UserComment} from "./comments.models";
import {CommentsService} from "./comments.service";
import {CreateCommentDto} from "./dto/create-comment-dto";
import {UpdateCommentDto} from "./dto/update-comment-dto";
import {OwnershipGuard} from "../auth/owner-guards";
import {UserColumn} from "../columns/columns.models";



@Controller('users')
@ApiTags('CommentsApi')

export class CommentsController {
    constructor(private commentService: CommentsService) {}

    @ApiOperation({summary: 'User Cards'})
    @ApiResponse({status: 200, type: [UserColumn]})
    @Get(':userId/comments')
    @UseGuards(JwtAuthGuards)
    AllUserCards(@Param() params: any) {
        return this.commentService.getUserComments(params.userId);
    }

    @ApiOperation({summary: 'Find comment by id'})
    @ApiResponse({status: 200, type: UserComment})
    @Get('comments/:commentId')
    @UseGuards(JwtAuthGuards)
    findComment(@Param() params: any) {
        return this.commentService.getComment(params.commentId);
    }

    @ApiOperation({summary: 'Comments on card'})
    @ApiResponse({status: 200, type: [UserComment]})
    @Get('comments/:cardId/cards')
    @UseGuards(JwtAuthGuards)
    getAllOnCard(@Param() params: any) {
        return this.commentService.getCommentOnCard(params.cardId);
    }

    @ApiOperation({summary: 'Create comment'})
    @ApiResponse({status: 200, type: UserComment})
    @Post('/comments/create')
    @UseGuards(JwtAuthGuards)
    create(@Headers('Authorization') headers:string,
           @Body() dto: CreateCommentDto) {
        return this.commentService.createComment(headers, dto);
    }

    @ApiOperation({summary: 'update comment'})
    @ApiResponse({status: 200, type: UserComment})
    @Put('/comments/update')
    @UseGuards(OwnershipGuard)
    update(@Body() dto: UpdateCommentDto) {
        return this.commentService.updateComment(dto);
    }

    @ApiOperation({summary: 'delete comment'})
    @ApiResponse({status: 200, type: UserComment})
    @Delete('/comments/:cardId/delete/:commentId')
    @UseGuards(OwnershipGuard)
    delete(@Param() params :any ) {
        return this.commentService.deleteComment(params.cardId, params.commentId);
    }
}
