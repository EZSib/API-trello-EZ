import {
    CanActivate,
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
    UnauthorizedException
} from "@nestjs/common";
import {Observable} from "rxjs";
import {JwtService} from "@nestjs/jwt";
import {Reflector} from "@nestjs/core";
import {User} from "../users/users.models";
import { UsersService } from "../users/users.service";
// import { ColumnsService } from "../Columns/Columns.service";
// import { CardsService } from "../Cards/Cards.service";
// import { CommentsService } from "../Comments/Comments.service";

@Injectable()
export class OwnershipGuard implements CanActivate {
    constructor(

        private jwtService: JwtService,
        private userService: UsersService,


    ) {}

    async canActivate(context: ExecutionContext):  Promise<boolean>  {
        const req = context.switchToHttp().getRequest();
        const authHeader = req.headers.authorization;
        const bearer = authHeader.split(' ')[0]
        const token = authHeader.split(' ')[1]

        if (bearer !== 'Bearer' || !token) {
            throw new UnauthorizedException({message: 'Пользователь не авторизован'})
        }
        const user = this.jwtService.verify(token);

        if (req.body.userId) {
            const modelId = req.body.userId;
            const model = await this.userService.getUserByUserId(modelId);
            if (user.userId === model.userId) {
                return true
            }
        }

        if (req.body.listId) {
            const modelId = req.body.listId
        }

        if (req.body.cardId) {
            const modelId = req.body.cardId
        }

        if (req.body.commentId) {
            const modelId = req.body.commentId
        }

    } catch (e) {
            console.log(e)
            throw new HttpException( 'Нет доступа', HttpStatus.FORBIDDEN)
        }
    }

// private cardsService: CardsService,
//     private commentsService: CommentsService,