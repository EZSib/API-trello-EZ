import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsString} from "class-validator";

export class UpdateCardDto {
    @ApiProperty({example: 'Card', description: 'Card rename'})
    @IsString({message:'Must be string'})
    readonly title: string;
    @ApiProperty({example: '653f7387995265564a2fc07a', description: 'Card Id'})
    @IsString({message:'Must be string'})
    readonly cardId: string;
}