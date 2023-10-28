import { Module } from '@nestjs/common';
import { CommentsController } from './comments.controller';
import { SequelizeModule } from "@nestjs/sequelize";
import { User } from "../users/users.models";
import { CommentsService } from "./comments.service";
import { UserCard } from "../cards/cards.models";
import { AuthModule } from "../auth/auth.module";
import { UserColumn } from "../columns/columns.models";
import { UserComment } from "./comments.models";




@Module({
  providers: [CommentsService],
  controllers: [CommentsController],
  imports: [
    SequelizeModule.forFeature([UserColumn, User,UserCard, UserComment]),
    AuthModule]
})
export class CommentsModule {}
