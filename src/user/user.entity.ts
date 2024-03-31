import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./role.entity";

@Entity("user")
export class User {
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    name:string

    @Column()
    email:string

    @Column()
    password:string

    @Column()
    role:Role;

    @Column()
    profileImage:string
}