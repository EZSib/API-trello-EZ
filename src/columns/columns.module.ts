import { Module } from '@nestjs/common';
import { ColumnsController } from './columns.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/users.models";
import {ColumnsService} from "./columns.service";
import {UserColumn} from "./columns.models";



@Module({
  providers: [ColumnsService],
  controllers: [ColumnsController],
  imports: [
    SequelizeModule.forFeature([UserColumn, User])
      ]
})
export class ColumnsModule {}


