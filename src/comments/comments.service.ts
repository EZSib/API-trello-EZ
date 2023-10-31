import {HttpStatus, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {JwtService} from "@nestjs/jwt";
import { keyApi, trelloToken} from "../trello_items";
import {UserComment} from "./comments.models";
import {CreateCommentDto} from "./dto/create-comment-dto";
import {UpdateCommentDto} from "./dto/update-comment-dto";


@Injectable()
export class CommentsService {
    constructor(@InjectModel(UserComment) private userCommentRepository: typeof UserComment,
                private jwtService: JwtService) {}

    async getUserComments(userId:number){
        return await this.userCommentRepository.findAll({where:{userId:userId}})
    }

    async getComment(commentId:string){
        return await this.userCommentRepository.findByPk(commentId)
    }

    async getCommentOnCard(cardId:string){
        return await this.userCommentRepository.findAll({where:{cardId:cardId}})
    }

    async deleteComment(cardId: string, commentId: string){
        fetch(`https://api.trello.com/1/cards/${cardId}/actions/${commentId}/comments?key=${keyApi}&token=${trelloToken}`, {
            method: 'DELETE'
        })
        await this.userCommentRepository.destroy({where: {commentId: commentId}})
        return `${commentId} -deleted. HttpStatus:${HttpStatus.OK}`
    }

    async updateComment(dto: UpdateCommentDto) {
        fetch(`https://api.trello.com/1/cards/${dto.cardId}/actions/${dto.commentId}/comments?text={text}&key=${keyApi}&token=${trelloToken}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                'text': dto.text
            })
        })
        const comment = await this.userCommentRepository.findByPk(dto.commentId)
        comment.text = await dto.text
        await comment.save()
        return comment
    }

    async createComment(header:string, dto: CreateCommentDto):Promise<UserComment> {
        const fetch = await require('node-fetch');
        dto.userId = this.jwtService.verify(header.split(' ')[1]).userId

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

        async function getLastId(response){
            const result = (await response.json()) as GetUsersResponse;
            const res = JSON.stringify(result, null, 4)
            return res.split('\n')[1].slice(11,35);
        }
        dto.commentId = await getLastId(response)
        return await this.userCommentRepository.create(dto)

    }
}

