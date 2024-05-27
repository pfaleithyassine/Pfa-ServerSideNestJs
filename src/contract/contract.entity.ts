
import { Product } from "src/products/products.entity";
import { Purchase } from "src/purchases/purchase.entity";
import { User } from "src/user/user.entity";
import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";

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

    @OneToMany(() => Purchase, purchase => purchase.contract)
    purchases: Purchase[];

}