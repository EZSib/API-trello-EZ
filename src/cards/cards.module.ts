import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/users.models";
import {CardsService} from "./cards.service";
import {UserCard} from "./cards.models";
import {AuthModule} from "../auth/auth.module";
import {UserColumn} from "../columns/columns.models";




@Module({
    providers: [CardsService],
    controllers: [CardsController],
    imports: [
        SequelizeModule.forFeature([UserColumn, User,UserCard]),
        AuthModule]
})
export class CardsModule {}