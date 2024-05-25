import { Contract } from "src/contract/contract.entity";
import { Purchase } from "src/purchases/purchase.entity";
import { AgentSeller } from "src/user/agentSeller.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("product")
export class Product {
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()

    description: string;
    @Column()

    price: number;
    @Column()

    stock: number;
    @Column()

    @Column()
    imageProduct: string;

    
    @ManyToOne(() => AgentSeller, agentSeller => agentSeller.products, { nullable: true })
    agentSeller: AgentSeller;
    @OneToMany(() => Contract, contract => contract.product)
    Contracts: Contract[];

    @OneToMany(() => Purchase, purchase => purchase.product)
    purchases: Purchase[];
 
}