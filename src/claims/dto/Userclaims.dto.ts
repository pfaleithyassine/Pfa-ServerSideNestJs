import { IsEnum, IsNumber, IsString } from "class-validator";
import { TypeClaim } from "../enums/TypeClaim.enum";


export class UserClaimDto{
    @IsString()
    description: string;
    
    @IsNumber()
    user: number;
    
    @IsNumber()
    claim: number;

    @IsEnum( TypeClaim )
    typeClaim: TypeClaim;

}