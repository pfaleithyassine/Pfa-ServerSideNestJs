import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { UserModule } from 'src/user/user.module';
import { AgentSellerModule } from 'src/agent-seller/agent-seller.module';
import { AgentSeller } from 'src/user/agentSeller.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product,AgentSeller]), UserModule, AgentSellerModule],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
