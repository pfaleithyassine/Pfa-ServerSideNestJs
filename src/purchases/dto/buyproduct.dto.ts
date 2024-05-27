import { IsNumber, IsDate, IsDateString, IsString } from "class-validator";

export class BuyProductDto{
    @IsNumber()
    userId: number;
    @IsString()
    productId: number;
    @IsString()
    contractId: number;
    @IsDateString()
    dateFin: Date;
}