import { IsString } from "class-validator";

export class ProductDto {
    @IsString()
    id: number;
    @IsString()
    name: string;

    @IsString()
    description: string;
  
    price: number;
    
    createdAt: Date;
}