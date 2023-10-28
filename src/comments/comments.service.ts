import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {JwtService} from "@nestjs/jwt";
import { keyApi, trelloToken} from "../trello_items";
import {UserComment} from "./comments.models";
import {CreateCommentDto} from "./dto/create-comment-dto";


@Injectable()
export class CommentsService {
    constructor(@InjectModel(UserComment) private userCommentRepository: typeof UserComment,
                private jwtService: JwtService) {}
    async createComment(header:string, dto: CreateCommentDto):Promise<UserComment> {
        const fetch = await require('node-fetch');
        dto.userId = this.jwtService.verify(header.split(' ')[1]).id

        type Res = {};

        type GetUsersResponse = {
            data: Res[];
        };

        const response = await fetch(`https://api.trello.com/1/cards/${dto.cardId}/actions/comments?text=?&key=${keyApi}&token=${trelloToken}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'text': dto.text
            })
        })

        async function getgthis(response){
            const result = (await response.json()) as GetUsersResponse;
            const res = JSON.stringify(result, null, 4)
            return res.split('\n')[1].slice(11,35);
        }
        dto.commentId = await getgthis(response)

        return await this.userCommentRepository.create(dto)


    }
}

