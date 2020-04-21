import {Entity, Column, PrimaryGeneratedColumn, BaseEntity} from "typeorm";

@Entity("users")
export class User extends BaseEntity{
    // 1, 2, 3
    @PrimaryGeneratedColumn("uuid") id: string;

    @Column("varchar", { length: 255 }) email: string;

    @Column("text") password: string;
}
