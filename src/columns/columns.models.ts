import {Model, Table, Column, DataType, BelongsTo, ForeignKey, HasMany} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.models";
import {UserCard} from "../cards/cards.models";
import {IsString} from "class-validator";

interface ColumnCreationAttrs {
    title: string;
    userId: number;
    listId : string;

}
@Table({tableName: 'columns'})
export class UserColumn extends Model <UserColumn, ColumnCreationAttrs> {

    @ApiProperty({example: 'Interesting', description: 'columnName'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    title: string;

    @ForeignKey(() => UserColumn)
    @ApiProperty({example: '"65353795450c6870df94394b"', description: 'autoFilled'})
    @Column({type: DataType.STRING, unique: true, primaryKey: true})
    listId: string;


    @ApiProperty({example: 'false', description: 'delete or not'})
    @Column({type: DataType.BOOLEAN})
    Deleted: boolean = false;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @BelongsTo(() => User)
    author: User

    @HasMany(() => UserCard)
    columns: UserCard[];


}