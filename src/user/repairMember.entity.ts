import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Role } from "./enum/role.enum";


@Entity("repairMember")
export class RepairMember extends User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ default: Role.REPAIR })
    role: Role;

    @Column({nullable:true})
    companyName?: string;
   
}