import { Module } from '@nestjs/common';
import { ColumnsController } from './columns.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/users.models";
import {ColumnsService} from "./columns.service";
import {UserColumn} from "./columns.models";
import {AuthModule} from "../auth/auth.module";
import {UserCard} from "../cards/cards.models";
import {UserComment} from "../comments/comments.models";
import {Post} from "../posts/posts.models";




@Module({
  providers: [ColumnsService],
  controllers: [ColumnsController],
  imports: [
    SequelizeModule.forFeature([User, Post,UserColumn,UserCard,UserComment]),
      AuthModule]
})
export class ColumnsModule {}


