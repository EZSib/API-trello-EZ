import { Module } from '@nestjs/common';
import { CardsController } from './cards.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/users.models";
import {CardsService} from "./cards.service";
import {UserCard} from "./cards.models";
import {AuthModule} from "../auth/auth.module";
import {UserColumn} from "../columns/columns.models";
import {UserComment} from "../comments/comments.models";
import {OwnershipGuard} from "../auth/owner-guards";
import {UsersService} from "../users/users.service";
import {CommentsService} from "../comments/comments.service";
import {ColumnsService} from "../columns/columns.service";




@Module({
    providers: [UsersService,OwnershipGuard,CommentsService,ColumnsService,CardsService],
    controllers: [CardsController],
    imports: [
        SequelizeModule.forFeature([User,UserColumn,UserCard,UserComment]),
        AuthModule]
})
export class CardsModule {}