import {ApiProperty} from "@nestjs/swagger";
import {IsString} from "class-validator";

export class UpdateColumnDto {
    @ApiProperty({example: 'test-clmn1s', description: 'column rename'})
    @IsString({message:'must be string'})
    readonly title: string;
}