import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../users/users.models";
import { CommentsService } from "./comments.service";
import { UserCard } from "../cards/cards.models";
import { AuthModule } from "../auth/auth.module";
import { UserColumn } from "../columns/columns.models";
import { UserComment } from "./comments.models";
import {Post} from "../posts/posts.models";
import {OwnershipGuard} from "../auth/owner-guards";
import {UsersService} from "../users/users.service";
import {ColumnsService} from "../columns/columns.service";
import {CardsService} from "../cards/cards.service";




@Module({
  providers: [UsersService,OwnershipGuard,CommentsService,ColumnsService,CardsService],
  controllers: [CommentsController],
  imports: [
    SequelizeModule.forFeature([User, Post,UserColumn,UserCard,UserComment]),
    AuthModule]
})
export class CommentsModule {}
