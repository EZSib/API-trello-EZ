import {Body, Controller, Headers, Post, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {JwtAuthGuards} from "../auth/jwt.auth.guards";
import {UserComment} from "./comments.models";
import {CommentsService} from "./comments.service";
import {CreateCommentDto} from "./dto/create-comment-dto";


@Controller('comments')
export class CommentsController {
    constructor(private commentService: CommentsService) {
    }

    @ApiOperation({summary: 'Create post'})
    @ApiResponse({status: 200, type: UserComment})
    @Post('/Cards/create')
    @UseGuards(JwtAuthGuards)
    create(@Headers('Authorization') headers:string,
           @Body() dto: CreateCommentDto) {
        return this.commentService.createComment(headers, dto);

    }
}
