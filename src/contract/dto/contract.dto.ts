import { IsDate, IsDateString, IsNumber, IsString } from "class-validator";



export class ContractDto {
    @IsString()
    name: string;
    @IsString()
    description: string;
    @IsNumber()
    price: number;
   
    
    
}