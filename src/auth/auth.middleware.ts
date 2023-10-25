import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';


@Injectable()
export class AuthMiddleware implements NestMiddleware {
    constructor(private readonly authService: AuthService) {}

    async use(req: Request, res: Response, next: Function) {
        const token = req.headers.authorization;
        const decodedToken = await this.authService.verifyToken(token);
        (req as any).user = decodedToken;

        next();
    }
}