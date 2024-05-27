import { Contract } from "src/contract/contract.entity";
import { Product } from "src/products/products.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity("purchase")
export class Purchase{
    @PrimaryGeneratedColumn()
    id: number;

    @Column({default:new Date()})
    dateDebut: Date;
    @Column()
    dateFin: Date;
    
    @ManyToOne(() => User, user => user.purchases)
    user: User;
    @ManyToOne(() => Product, product => product.purchases)
    product: Product;
    @ManyToOne(() => Contract, contract => contract.purchases)
    contract: Contract;

}