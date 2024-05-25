import { Controller, Get, UseGuards } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Role } from 'src/auth/role-decorator';
import { jwtAuthGuard } from 'src/auth/jwt.guard';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get("/all")
  @UseGuards(jwtAuthGuard)
  @Role('agent')
  async getAllProducts() {
    return this.productsService.getAllProducts();
  }
  
  
}
