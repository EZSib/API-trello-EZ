import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsString} from "class-validator";

export class CreateCardDto {
    @ApiProperty({example: '65353795450c6870df94394b', description: 'listId (trello listId)'})
    @IsString({message:'Must be string'})
    readonly listId: string;
    @ApiProperty({example: 'Card', description: 'Card name'})
    @IsString({message:'Must be string'})
    readonly cardName: string;
    userId: number;
    cardId: string;
}