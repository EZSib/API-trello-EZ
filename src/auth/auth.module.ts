import { Module } from '@nestjs/common';
import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {UsersModul} from "../users/users.modul";
import {JwtModule} from "@nestjs/jwt";
import * as process from "process";

@Module({})
export class AuthModule {
    controllers: [AuthController],
    providers: [AuthService],
    imports: [
        UsersModul,
        JwtModule.register({
            secret: process.env.PRIVATE_KEY || 'SECRET',
            signOption: {
                expireIn:
            }
})
    ]
}
