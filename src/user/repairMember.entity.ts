import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Role } from "./enum/role.enum";
import { Claims } from "src/claims/claims.entity";
import { Exclude } from "class-transformer";
import { EtatUser } from "./enum/etatuser.enum";


@Entity("repairMember")
export class RepairMember {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name:string

    @Column()
    email:string

    @Column()
    @Exclude({ toPlainOnly: true })
    password:string

    @Column({ default: Role.REPAIR })
    role: Role;

    @Column({default:EtatUser.ACTIVATED})
    isActivate:EtatUser

    @Column({nullable:true})
    companyName?: string;

    @OneToMany(() => Claims, claim => claim.repairMember)
    claims: Claims[];
   
}