import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";

export class UpdateCommentDto {
    @ApiProperty({example: '65353795450c6870df94394b', description: 'cardId (trello cardId)'})
    @IsString({message:'Must be string'})
    readonly cardId: string;

    @ApiProperty({example: '65353795450c6870df94394b', description: 'text comment'})
    @IsString({message:'Must be string'})
    readonly commentId: string;

    @ApiProperty({example: 'U welcome!', description: 'Text comment'})
    @IsString({message:'Must be string'})
    readonly text: string;

}