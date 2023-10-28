import {Model, Table, Column, DataType, BelongsTo, ForeignKey} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.models";


interface CommentCreationAttrs {
    cardId: string;
}
@Table({tableName: 'comments'})
export class UserComment extends Model <UserComment, CommentCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'U welcome!', description: 'Text comment'})
    @Column({type: DataType.STRING,  allowNull: false})
    text: string;

    @ApiProperty({example: '65353795450c6870df94394b', description: 'trelloCardID'})
    @Column({type: DataType.STRING})
    cardId: string;

    @ApiProperty({example: '65353795450c6870df94394b', description: 'trelloCommentsID'})
    @Column({type: DataType.STRING, unique:true})
    commentId: string;

    @ForeignKey(() => User)
    @ApiProperty({example: 0, description: 'autoFilled'})
    @Column({type: DataType.INTEGER})
    userId: number;


    @BelongsTo(() => User)
    author: User;

}