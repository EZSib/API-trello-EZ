import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/users.models";
import {CardsService} from "./cards.service";
import {UserCard} from "./cards.models";
import {AuthModule} from "../auth/auth.module";
import {UserColumn} from "../columns/columns.models";
import {UserComment} from "../comments/comments.models";
import {Post} from "../posts/posts.models";




@Module({
    providers: [CardsService],
    controllers: [CardsController],
    imports: [
        SequelizeModule.forFeature([User, Post,UserColumn,UserCard,UserComment]),
        AuthModule]
})
export class CardsModule {}