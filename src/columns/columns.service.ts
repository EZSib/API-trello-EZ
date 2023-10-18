import {HttpException, HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {User} from "../users/users.models";
import {UserColumn} from "./columns.models";
import {CreateColumnDto} from "./dto/create-column-dto";
import * as process from "process";

@Injectable()
export class ColumnsService {

    constructor(@InjectModel(UserColumn) private userColumnRepository: typeof UserColumn) {}
    async createColumn(dto: CreateColumnDto) {
        const user:User = await this.userRepository.findByPk(dto.userId);
        if(!user){
            throw new HttpException('user not found', HttpStatus.NOT_FOUND);
        }
        const title = await this.userColumnRepository.create(dto);
        const fetch = require('node-fetch');

        fetch(`https://api.trello.com/1/lists?name=${title}&idBoard=${process.env.BOARD}&key=${process.env.KEY}&token=${process.env.TOKEN}`, {
            method: 'POST'
        }).then(response => {
                console.log(
                    `Response: ${response.status} ${response.statusText}`);
            })
            .then(text => console.log(text))
            .catch(err => console.error(err));
        return title;
    }
}