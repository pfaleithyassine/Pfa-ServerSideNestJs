import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";
import { Exclude } from "class-transformer";

@Entity("user")
export class User {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @Column()
    email:string

    @Column()
    @Exclude({ toPlainOnly: true })
    password:string

    @Column()
    role:Role;

    @Column()
    profileImage:string
}