import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { BuyProductDto } from './dto/buyproduct.dto';

@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Post('/buy')
  async buyProduct(@Body() body: BuyProductDto) {
    console.log(body.userId, body.productId)
    return await this.purchasesService.userBuyProduct(body.userId, body.productId, body.contractId, body.dateFin);
  }

  @Get('/getbyuser/:id')
  async getPurchases( @Param('id') id: number) {
    return await this.purchasesService.getPurchasesByUser(id);
  }
}
