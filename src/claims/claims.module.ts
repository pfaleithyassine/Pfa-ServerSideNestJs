import { Module } from '@nestjs/common';
import { ClaimsService } from './claims.service';
import { ClaimsController } from './claims.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserClaims } from './UserClaims.entity';
import { Claims } from './claims.entity';
import { User } from 'src/user/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Claims,UserClaims]) ,TypeOrmModule.forFeature([User])],
  controllers: [ClaimsController],
  providers: [ClaimsService],
})
export class ClaimsModule {}
