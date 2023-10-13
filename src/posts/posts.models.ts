import {Model, Table, Column, DataType, BelongsTo, ForeignKey} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.models";

interface PostCreationAttrs {
    title: string;
    content: string;
    userId: number;
    image: string;
}
@Table({tableName: 'posts'})
export class Post extends Model <Post, PostCreationAttrs> {
    @ApiProperty({example: 1, description: 'uniq ID'})
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Theme', description: 'My theme'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    title: string;

    @ApiProperty({example: 'Content', description: 'very interesting'})
    @Column({type: DataType.STRING, allowNull: false})
    content: string;

    @ApiProperty({example: 'JPG image', description: 'JPG image'})
    @Column({type: DataType.STRING, allowNull: false})
    image: string;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @BelongsTo(() => User)
    author: User
}