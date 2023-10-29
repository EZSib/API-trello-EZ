import {forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./users.models";
import {AuthModule} from "../auth/auth.module";
import {Post} from "../posts/posts.models";
import {OwnershipGuard} from "../auth/owner-guards";
import {UserColumn} from "../columns/columns.models";
import {UserCard} from "../cards/cards.models";
import {UserComment} from "../comments/comments.models";

@Module({
  controllers: [UsersController],
  providers: [UsersService,OwnershipGuard],
  imports: [
      SequelizeModule.forFeature([User, Post,UserColumn,UserCard,UserComment]),
      forwardRef(() => AuthModule),
  ],
    exports: [
        UsersService,
    ]
})
export class UsersModule {}
