import { Product } from "src/products/products.entity";
import { User } from "src/user/user.entity";
import { Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";



@Entity("purchase")
export class Purchase{
    @PrimaryGeneratedColumn()
    id: number;
    
    @ManyToOne(() => User, user => user.purchases)
    user: User;

    @ManyToOne(() => Product, product => product.purchases)
    product: Product;

}