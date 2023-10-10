import {ApiProperty} from "@nestjs/swagger";

export class CreateUserDto {
    @ApiProperty({example: 'mai@mail.com', description: 'u email'})
    readonly email: string;
    @ApiProperty({example: '123123', description: 'password'})
    readonly password: string;
}