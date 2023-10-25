import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {JwtService} from "@nestjs/jwt";
import {board, keyApi, trelloToken} from "../trello_items";
import {UserCard} from "./cards.models";
import {CreateCardDto} from "./dto/create-card-dto";


@Injectable()
export class CardsService {
    constructor(@InjectModel(UserCard) private userCardRepository: typeof UserCard,
                private jwtService: JwtService) {}
    async createCard(header:string, dto: CreateCardDto):Promise<UserCard> {
        const fetch = await require('node-fetch');
        dto.userId = this.jwtService.verify(header.split(' ')[1]).id

        type Res = {};

        type GetUsersResponse = {
            data: Res[];
        };

        const response = await fetch(`https://api.trello.com/1/cards?idList=${dto.listId}&key=${keyApi}&token=${trelloToken}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
            'name': dto.cardName
        })
    })
        async function getgthis(response){
            const result = (await response.json()) as GetUsersResponse;
            const res = JSON.stringify(result, null, 4)
            return res.split('\n')[1].slice(11,35);
        }
        dto.cardId = await getgthis(response)

        return await this.userCardRepository.create(dto)


    }
}

