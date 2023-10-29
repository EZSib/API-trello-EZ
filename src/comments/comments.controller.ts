import {Body, Controller, Delete, Headers, Param, Post, Put, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuards} from "../auth/jwt.auth.guards";
import {UserComment} from "./comments.models";
import {CommentsService} from "./comments.service";
import {CreateCommentDto} from "./dto/create-comment-dto";
import {UpdateCommentDto} from "./dto/update-comment-dto";
import {OwnershipGuard} from "../auth/owner-guards";


@Controller('users')
@ApiTags('CommentsApi')

export class CommentsController {
    constructor(private commentService: CommentsService) {
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
    @UseGuards(JwtAuthGuards)
    // @UseGuards(OwnershipGuard)
    update(@Body() dto: UpdateCommentDto) {
        return this.commentService.updateComment(dto);

    }
    @ApiOperation({summary: 'delete comment'})
    @ApiResponse({status: 200, type: UserComment})
    @Delete('/comments/:cardId/delete/:commentId')
    @UseGuards(JwtAuthGuards)
    // @UseGuards(OwnershipGuard)
    delete(@Param() params :any ) {
        return this.commentService.deleteComment(params.cardId, params.commentId);

    }
}
