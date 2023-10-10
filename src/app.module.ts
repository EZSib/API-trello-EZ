import {Module} from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModul } from './users/users.modul';
import {ConfigModule} from "@nestjs/config";
import {User} from "./users/users.models";
import { AuthController } from './auth/auth.controller';
import { AuthService } from './auth/auth.service';
import { AuthModule } from './auth/auth.module';

@Module( {
    controllers : [AuthController],
    providers: [AuthService],
    imports: [
        ConfigModule.forRoot({
            envFilePath: `.${process.env.NODE_ENV}.env`
        }),
        SequelizeModule.forRoot({
            dialect: 'postgres',
            host: process.env.POSTGRESS_HOST,
            port: Number(process.env.POSTGRESS_PORT),
            username: process.env.POSTGRESS_USER,
            password: process.env.POSTGRESS_PASSWORD,
            database: process.env.POSTGRESS_DB,
            models: [User],
            autoLoadModels: true
        }),
        UsersModul,
        AuthModule,
    ]
})
export class AppModule {}