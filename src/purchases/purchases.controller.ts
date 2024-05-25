import { Body, Controller, Post } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { BuyProductDto } from './dto/buyproduct.dto';

@Controller('purchases')
export class PurchasesController {
  constructor(private readonly purchasesService: PurchasesService) {}

  @Post('/buy')
  async buyProduct(@Body() body: BuyProductDto) {
    console.log(body)
    return await this.purchasesService.userBuyProduct(body.userId, body.productId);
  }
}
