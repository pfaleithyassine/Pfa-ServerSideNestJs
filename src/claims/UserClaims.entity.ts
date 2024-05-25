import { User } from "src/user/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Claims } from "./claims.entity";


@Entity("Userclaims")
export class UserClaims{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column({default: new Date()})
    createdAt: Date;

    @ManyToOne(() => User, user => user.userclaims)
    user: User;
    @ManyToOne(() => Claims, claim => claim.userclaims)
    claim: Claims;
}