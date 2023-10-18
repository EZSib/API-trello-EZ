import { Module } from '@nestjs/common';
import { ColumnsController } from './columns.controller';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../users/users.models";
import {FilesModule} from "../files/files.module";
import {ColumnsService} from "./columns.service";
import {UserColumn} from "./columns.models";


@Module({
  providers: [ColumnsService],
  controllers: [ColumnsController],
  imports: [
    SequelizeModule.forFeature([UserColumn, User]),
    FilesModule]
})
export class ColumnsModule {}


