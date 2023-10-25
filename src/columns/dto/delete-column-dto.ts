import {ApiProperty} from "@nestjs/swagger";
import {IsNumber, IsString} from "class-validator";

export class CreateColumnDto {
    @ApiProperty({example: 'test-clmns', description: 'column name'})
    @IsNumber({},{message:'must be number'})
    readonly title: number;
}