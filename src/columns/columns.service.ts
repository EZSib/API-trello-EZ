import {HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {UserColumn} from "./columns.models";
import {CreateColumnDto} from "./dto/create-column-dto";
import {board, keyApi, trelloToken} from "../trello_items";
import {JwtService} from "@nestjs/jwt";
import {UpdateColumnDto} from "./dto/update-column-dto";


@Injectable()
export class ColumnsService {

    constructor(@InjectModel(UserColumn) private userColumnRepository: typeof UserColumn,
                private jwtService: JwtService) {}

    async getColumn(listId:string){
        return await this.userColumnRepository.findByPk(listId)
    }

    async getUserColumns(userId:number){
        return await this.userColumnRepository.findAll({where:{userId:userId}})
    }

    async archiveColumn(listId){
        fetch(`https://api.trello.com/1/lists/${listId}/closed?key=${keyApi}&token=${trelloToken}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'value': true
            })
        })
        const column = await this.userColumnRepository.findByPk(listId)
        column.Deleted = true
        column.save()
        return `Column ${listId} is archived. HttpStatus:${HttpStatus.OK}`
    }

    async unarchiveColumn(listId){
        fetch(`https://api.trello.com/1/lists/${listId}/closed?key=${keyApi}&token=${trelloToken}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'value': false
            })
        })
        const column = await this.userColumnRepository.findByPk(listId)
        column.Deleted = false
        column.save()
        return `Column ${listId} is unarchived. HttpStatus:${HttpStatus.OK}`
    }

    async updateColumn(dto: UpdateColumnDto,listId) {
        fetch(`https://api.trello.com/1/lists/${listId}?key=${keyApi}&token=${trelloToken}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'name': dto.title
            })
        })
        const column = await this.userColumnRepository.findByPk(listId)
        column.title = await dto.title
        await column.save()
        return column
    }

    async createColumn(header:string, dto: CreateColumnDto):Promise<UserColumn> {
        const fetch = await require('node-fetch');
        dto.userId = this.jwtService.verify(header.split(' ')[1]).userId


        await fetch(`https://api.trello.com/1/lists?name=${dto.title}&idBoard=${board}&key=${keyApi}&token=${trelloToken}`, {
                method: 'POST'})

        type Res = {};

        type GetUsersResponse = {
            data: Res[];
        };
        async function getLists() {
            try {
                const response = await fetch('https://api.trello.com/1/boards/652eb831c7fdb862f9d5c45f/lists?key=4e7b948bcf4247f1c26fd810049c627f&token=ATTA5b52cb63031ea61b7d10115cc0456c6433718bd205dc653c89583162e504707dC98E7E0D', {
                    method: 'GET',
                    headers: {
                        Accept: 'application/json',
                    },
                });

                if (!response.ok) {
                    throw new Error(`Error! status: ${response.status}`);
                }

                const result = (await response.json()) as GetUsersResponse;
                const res = JSON.stringify(result, null, 4)
                return  res.split('\n')[2].slice(15,39);

            } catch (error) {
                if (error instanceof Error) {
                    console.log('error message: ', error.message);
                    return error.message;
                } else {
                    console.log('unexpected error: ', error);
                    return 'An unexpected error occurred';
                }
            }
        }
        dto.listId =  await getLists();
        return await this.userColumnRepository.create(dto);
    }
}