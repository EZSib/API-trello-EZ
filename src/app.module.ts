import {Module} from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from './users/users.module';
import {ConfigModule} from "@nestjs/config";
import {User} from "./users/users.models";
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import {Post} from "./posts/posts.models";
import { FilesModule } from './files/files.module';
import {ServeStaticModule} from "@nestjs/serve-static";
import { ColumnsModule } from './columns/columns.module';
import * as path from 'path';
import {UserColumn} from "./columns/columns.models";


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
            models: [User, Post,UserColumn],
            autoLoadModels: true
        }),
        UsersModule,
        AuthModule,
        PostsModule,
        FilesModule,
        ColumnsModule,
    ]
})
export class AppModule {}