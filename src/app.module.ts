import {Module, MiddlewareConsumer, RequestMethod} from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import {User} from "./users/users.models";
import { AuthModule } from './auth/auth.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import { ColumnsModule } from './columns/columns.module';
import * as path from 'path';
import {UserColumn} from "./columns/columns.models";
import {AuthMiddleware} from "./auth/auth.middleware";
import { CardsModule } from './cards/cards.module';
import {UserCard} from "./cards/cards.models";
import {CommentsModule} from "./comments/comments.module";
import {UserComment} from "./comments/comments.models";



@Module( {

    controllers : [],
    providers: [],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        ServeStaticModule.forRoot({
            rootPath: path.resolve(__dirname,'static')
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRESS_HOST,
            port: Number(process.env.POSTGRESS_PORT),
            username: process.env.POSTGRESS_USER,
            password: process.env.POSTGRESS_PASSWORD,
            database: process.env.POSTGRESS_DB,
            models: [User,UserColumn,UserCard, UserComment],
            autoLoadModels: true
        }),
        UsersModule,
        AuthModule,
        ColumnsModule,
        CardsModule,
        CommentsModule,
    ]
})

export class AppModule {}

// configure(consumer: MiddlewareConsumer) {
//     consumer
//         .apply(AuthMiddleware)
//         .forRoutes({ path: 'users/*', method: RequestMethod.ALL });
// }