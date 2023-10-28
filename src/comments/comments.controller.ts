import {Body, Controller, Headers, Post, UseGuards} from '@nestjs/common';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";
import {JwtAuthGuards} from "../auth/jwt.auth.guards";
import {UserComment} from "./comments.models";
import {CommentsService} from "./comments.service";
import {CreateCommentDto} from "./dto/create-comment-dto";


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
}
