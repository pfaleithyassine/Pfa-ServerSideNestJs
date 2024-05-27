import { IsNumber, IsString } from "class-validator";

export class ProductDto {

    @IsString()
    name: string;

    @IsString()
    description: string;
  
    @IsString()
    price: number;

    @IsString()
    stock: number;
    
    @IsString()
    agentSellerId: number;
    
    createdAt: Date;
}