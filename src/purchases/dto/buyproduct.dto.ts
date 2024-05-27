import { IsNumber, IsDate, IsDateString } from "class-validator";

export class BuyProductDto{
    @IsNumber()
    userId: number;
    @IsNumber()
    productId: number;
    @IsNumber()
    contractId: number;
    @IsDateString()
    dateFin: Date;
}