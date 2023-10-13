import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsString, Length} from "class-validator";

export class CreateUserDto {
    @ApiProperty({example: 'mai@mail.com', description: 'u email'})
    @IsString({message:'Must be string'})
    @IsEmail({},{message: 'invalid email'})
    readonly email: string;
    @ApiProperty({example: '123123', description: 'password'})
    @IsString({message:'Must be string'})
    @Length(4, 16, {message:'pass must be 4 between 16'})
    readonly password: string;
}