import {ApiProperty} from "@nestjs/swagger";
import { IsString} from "class-validator";


export class CreateColumnDto {
    @ApiProperty({example: 'test-clmns', description: 'column name'})
    @IsString({message:'Must be string'})
    readonly title: string;

    userId: number;
    listId : string;
}