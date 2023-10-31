import {HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {JwtService} from "@nestjs/jwt";
import { keyApi, trelloToken} from "../trello_items";
import {UserCard} from "./cards.models";
import {CreateCardDto} from "./dto/create-card-dto";
import {UpdateCardDto} from "./dto/update-card-dto";


@Injectable()
export class CardsService {
    constructor(@InjectModel(UserCard) private userCardRepository: typeof UserCard,
                private jwtService: JwtService) {}

    async getUserCards(userId:number){
        return await this.userCardRepository.findAll({where:{userId:userId}})
    }

    async getCard(cardId:string){
        return await this.userCardRepository.findByPk(cardId)
    }
    async getCardOnColumn(ColumnId:string){
        return await this.userCardRepository.findAll({where:{listId:ColumnId}})
    }

    async deleteCard(cardId){
        fetch(`https://api.trello.com/1/cards/${cardId}?key=${keyApi}&token=${trelloToken}`, {
            method: 'DELETE'
        })
        await this.userCardRepository.destroy({where: {cardId: cardId}})
        return `${cardId} -deleted. HttpStatus:${HttpStatus.OK}`
    }

    async updateCard(dto: UpdateCardDto) {
        fetch(`https://api.trello.com/1/cards/${dto.cardId}?key=${keyApi}&token=${trelloToken}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'name': dto.title
            })
        })
        const card = await this.userCardRepository.findByPk(dto.cardId)
        card.cardName = await dto.title
        await card.save()
        return card
    }

    async createCard(header:string, dto: CreateCardDto):Promise<UserCard> {
        const fetch = await require('node-fetch');
        dto.userId = this.jwtService.verify(header.split(' ')[1]).userId

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

