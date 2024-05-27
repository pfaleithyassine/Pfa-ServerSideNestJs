import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./enum/role.enum";
import { Exclude } from "class-transformer";
import { EtatUser } from "./enum/etatuser.enum";
import { Product } from "src/products/products.entity";
import { Contract } from "src/contract/contract.entity";
import { Purchase } from "src/purchases/purchase.entity";
import { UserClaims } from "src/claims/UserClaims.entity";

@Entity("user")
export abstract class User extends BaseEntity {
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

    @Column({nullable:true})
    profileImage?:string

    @Column({default:EtatUser.ACTIVATED})
    isActivate:EtatUser

    @Column({default:new Date()})
    createdAt:Date
    @OneToMany(() => Purchase, purchase => purchase.user)
    purchases: Purchase[];

    @OneToMany(() => UserClaims, userclaims => userclaims.user)
    userclaims: UserClaims[];

  

    

    
}