import { Module } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractController } from './contract.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contract } from './contract.entity';
import { User } from 'src/user/user.entity';
import { Purchase } from 'src/purchases/purchase.entity';
import { Product } from 'src/products/products.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Contract,User,Product,Purchase])],
  controllers: [ContractController],
  providers: [ContractService],
})
export class ContractModule {}
