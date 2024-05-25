import { Module } from '@nestjs/common';
import { PurchasesService } from './purchases.service';
import { PurchasesController } from './purchases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Purchase } from './purchase.entity';
import { Product } from 'src/products/products.entity';
import { User } from 'src/user/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([User,Product,Purchase])],
  controllers: [PurchasesController],
  providers: [PurchasesService],
})
export class PurchasesModule {}
