import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Role } from "./enum/role.enum";

@Entity("insurance")
export class Insurance extends User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: Role.INSURANCE })
    role: Role;

   
}