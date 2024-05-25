
import { Product } from "src/products/products.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("contract")
export class Contract{
    @PrimaryGeneratedColumn()
    id: number;
    @Column()
    name: string;
    @Column()
    description: string;
    @Column()
    price: number;

    @Column({default:new Date()})
    dateDebut: Date;
    @Column()
    dateFin: Date;
    
    @ManyToOne(() => User, user => user.Contracts)
    user: User;
    @ManyToOne(() => Product, product => product.Contracts)
    product: Product;
}