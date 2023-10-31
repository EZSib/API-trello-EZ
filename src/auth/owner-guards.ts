import {
    CanActivate,
    ExecutionContext,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import {JwtService} from "@nestjs/jwt";
import { UsersService } from "../users/users.service";
import {CommentsService} from "../comments/comments.service";
import {ColumnsService} from "../columns/columns.service";
import {CardsService} from "../cards/cards.service";


@Injectable()
export class OwnershipGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private userService: UsersService,
        private commentsService: CommentsService,
        private columnsService: ColumnsService,
        private cardsService: CardsService,
    ) {
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const req = context.switchToHttp().getRequest();
        const authHeader = req.headers.authorization;
        const bearer = authHeader.split(' ')[0]
        const token = authHeader.split(' ')[1]
        const method = req.method
        const params = req.param


        if (bearer !== 'Bearer' || !token) {
            throw new UnauthorizedException({message: 'Пользователь не авторизован'})
        }
        const user = this.jwtService.verify(token);

        if (req.body.userId) {
            const modelId = req.body.userId;
            const model = await this.userService.getUserByUserId(modelId);
            return user.userId === model.userId

        }
        if (method === 'PUT') {
            if (req.body.commentId && req.body.cardId) {
                const commentId = req.body.commentId
                const comment = await this.commentsService.getComment(commentId)
                return user.userId === comment.userId
            }

            if (req.body.cardId) {
                const cardId = req.body.cardId
                const card = await this.cardsService.getCard(cardId)
                return user.userId === card.userId
            }

            if (!req.params.userId && !req.params.cardId && !req.params.commentId) {
                const columnId = req.params.columnId
                const list = await this.columnsService.getColumn(columnId)
                return user.userId === list.userId
            }
        }

        if (method === 'DELETE') {
            if (params.commentId) {
                const commentId = req.params.commentId
                const comment = await this.commentsService.getComment(commentId)
                return user.userId === comment.userId
            } else {
                const cardId = req.params.cardId
                const card = await this.cardsService.getCard(cardId)
                return user.userId === card.userId
            }
        }
    }
}
