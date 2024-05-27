import { IsEnum, IsNumber, IsString } from "class-validator";
import { StatusClaim } from "../enums/StatusClaim.enum";


export class UserClaimDto{
    @IsString()
    description: string;
    
    @IsNumber()
    purchaseId: number;
    


}