import { Module } from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { ClaimsController } from './claims.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Claims } from './claims.entity';
import { User } from 'src/user/user.entity';
import { Purchase } from 'src/purchases/purchase.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Claims,Purchase]) ,TypeOrmModule.forFeature([User])],
  controllers: [ClaimsController],
  providers: [ClaimsService],
})
export class ClaimsModule {}
