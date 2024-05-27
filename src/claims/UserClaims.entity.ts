import { User } from "src/user/user.entity";
import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Claims } from "./claims.entity";
import { TypeClaim } from "./enums/TypeClaim.enum";


@Entity("Userclaims")
export class UserClaims{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column()
    typeClaim: TypeClaim;

    @Column({default: new Date()})
    createdAt: Date;

    @ManyToOne(() => User, user => user.userclaims)
    user: User;
    @ManyToOne(() => Claims, claim => claim.userclaims)
    claim: Claims;
}