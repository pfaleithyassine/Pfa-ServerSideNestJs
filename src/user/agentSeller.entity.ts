import { Column,  Entity,    OneToMany,    PrimaryGeneratedColumn } from "typeorm";
import { Role } from "./enum/role.enum";
import { Product } from "src/products/products.entity";
import { Exclude } from "class-transformer";
import { EtatUser } from "./enum/etatuser.enum";


@Entity()
export class AgentSeller{

        @PrimaryGeneratedColumn()
        id: number;

        
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

        @Column({nullable:true})
        companyName?: string;

        @OneToMany(() => Product, product => product.agentSeller)
        products: Product[];
    
}