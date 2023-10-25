import {Model, Table, Column, DataType, BelongsTo, ForeignKey} from "sequelize-typescript";
import {ApiProperty} from "@nestjs/swagger";
import {User} from "../users/users.models";

interface ColumnCreationAttrs {
    title: string;

}
@Table({tableName: 'columns'})
export class UserColumn extends Model <UserColumn, ColumnCreationAttrs> {
    @Column({type: DataType.INTEGER, unique: true, autoIncrement: true, primaryKey: true})
    id: number;

    @ApiProperty({example: 'Interesting', description: 'columnName'})
    @Column({type: DataType.STRING, unique: true, allowNull: false})
    title: string;

    @ApiProperty({example: '"65353795450c6870df94394b"', description: 'autoFilled'})
    @Column({type: DataType.STRING})
    listId: string;


    @ApiProperty({example: 'false', description: 'delete or not'})
    @Column({type: DataType.BOOLEAN})
    Deleted: boolean = false;

    @ForeignKey(() => User)
    @Column({type: DataType.INTEGER})
    userId: number;

    @BelongsTo(() => User)
    author: User



}