import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "../users/users.models";
import {UserColumn} from "./columns.models";
import {CreateColumnDto} from "./dto/create-column-dto";
import * as process from "process";
import { UsersService } from "../users/users.service";

@Injectable()
export class ColumnsService {

    constructor(@InjectModel(UserColumn) private userColumnRepository: typeof UserColumn) {}
    async createColumn(dto: CreateColumnDto):Promise<UserColumn> {
        const title = await this.userColumnRepository.create(dto);
        fetch(`https://api.trello.com/1/lists?name=${dto.title}&idBoard=652eb831c7fdb862f9d5c45f&key=4e7b948bcf4247f1c26fd810049c627f&token=ATTA5b52cb63031ea61b7d10115cc0456c6433718bd205dc653c89583162e504707dC98E7E0D`, {
                method: 'POST'})
        return title;
    }
}