import {forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "./users.models";
import {AuthModule} from "../auth/auth.module";
import {OwnershipGuard} from "../auth/owner-guards";
import {UserColumn} from "../columns/columns.models";
import {UserCard} from "../cards/cards.models";
import {UserComment} from "../comments/comments.models";
import {CommentsService} from "../comments/comments.service";
import {ColumnsService} from "../columns/columns.service";
import {CardsService} from "../cards/cards.service";

@Module({
  controllers: [UsersController],
  providers: [UsersService,OwnershipGuard,CommentsService,ColumnsService,CardsService],
  imports: [
      SequelizeModule.forFeature([User,UserColumn,UserCard,UserComment]),
      forwardRef(() => AuthModule),
  ],
    exports: [
        UsersService,
    ]
})
export class UsersModule {}
