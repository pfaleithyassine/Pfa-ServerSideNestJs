import { Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { UserClaims } from "./UserClaims.entity";


@Entity("claims")
export class Claims{
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => UserClaims, userclaims => userclaims.claim)
    userclaims: UserClaims[];
}