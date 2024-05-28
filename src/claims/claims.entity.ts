import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Purchase } from "src/purchases/purchase.entity";
import { StatusClaim } from "./enums/StatusClaim.enum";
import { RepairMember } from "src/user/repairMember.entity";


@Entity("claims")
export class Claims{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    description: string;

    @Column({default: StatusClaim.INPROGRESS})
    status: StatusClaim;

    @Column()
    claimImage: String;

    @Column({default:new Date()})
    dateClaim: Date;

    @ManyToOne(() => Purchase, purchase => purchase.claims)
    purchase: Purchase;

    @ManyToOne(() => RepairMember, repairMember => repairMember.claims)
     repairMember: RepairMember;
}