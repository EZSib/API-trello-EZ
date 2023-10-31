import {Model, Table, Column, DataType, HasMany} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {Post} from "../posts/posts.models";
import {UserColumn} from "../columns/columns.models";
import {UserCard} from "../cards/cards.models";
import {UserComment} from "../comments/comments.models";

interface UserCreationAttrs {
    email: string;
    password: string;
}
@Table({tableName: 'users'})
export class User extends Model <User, UserCreationAttrs> {
    @ApiProperty({example: 1, description: 'uniq ID'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    userId: number;

    @ApiProperty({example: 'email@mail.com', description: 'u email'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    email: string;

    @ApiProperty({example: '123123', description: 'password'})
    @Column({type: DataType.STRING, allowNull: false})
    password: string;

    @ApiProperty({example: 'true', description: 'banned or not'})
    @Column({type: DataType.BOOLEAN, defaultValue: false})
    banned: boolean;

    @ApiProperty({example: 'badBoy', description: 'reason'})
    @Column({type: DataType.STRING, allowNull: true})
    banReason: string;

    @HasMany(() => Post)
    posts: Post[];

    @HasMany(() => UserColumn)
    columns: UserColumn[];

    @HasMany(() => UserCard)
    cards: UserCard[];

    @HasMany(() => UserComment)
    comments: UserComment[];
}