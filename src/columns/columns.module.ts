import { Module } from '@nestjs/common';
import { ColumnsController } from './columns.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/users.models";
import {ColumnsService} from "./columns.service";
import {UserColumn} from "./columns.models";
import {AuthModule} from "../auth/auth.module";




@Module({
  providers: [ColumnsService],
  controllers: [ColumnsController],
  imports: [
    SequelizeModule.forFeature([UserColumn, User]),
      AuthModule]
})
export class ColumnsModule {}


