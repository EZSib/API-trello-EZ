import {Model, Table, Column, DataType, BelongsTo, ForeignKey, HasMany} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.models";
import {UserColumn} from "../columns/columns.models";
import {UserComment} from "../comments/comments.models";

interface CardCreationAttrs {
    listId: string;
    cardName: string;
    userId: number;
    cardId: string;

}
@Table({tableName: 'cards'})
export class UserCard extends Model <UserCard, CardCreationAttrs> {

    @ApiProperty({example: 'Interesting', description: 'CardName(empty when creating )'})
    @Column({type: DataType.STRING, defaultValue: ''})
    cardName: string;

    @ForeignKey(() => UserCard)
    @ApiProperty({example: '65353795450c6870df94394b', description: 'trelloCardID'})
    @Column({type: DataType.STRING, unique:true,primaryKey: true})
    cardId: string;

    @ForeignKey(() => UserColumn)
    @Column({type: DataType.STRING })
    listId: string;

    @ForeignKey(() => User)
    @ApiProperty({example: 0, description: 'autoFilled'})
    @Column({type: DataType.INTEGER})
    userId: number;


    @BelongsTo(() => User)
    author: User;

    @BelongsTo(() => UserColumn)
    onList: UserColumn;

    @HasMany(() => UserComment)
    comments: UserComment[];

}