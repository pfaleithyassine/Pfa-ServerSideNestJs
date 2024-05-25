import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './auth.strategy';
import { AgentSeller } from 'src/user/agentSeller.entity';
import { Insurance } from 'src/user/insurance.entity';
import { RepairMember } from 'src/user/repairMember.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User,AgentSeller,Insurance,RepairMember]) ,
    JwtModule.register({
    }),
    PassportModule,
    
    
   ],
  controllers: [AuthController],
  providers: [AuthService,JwtStrategy],
})
export class AuthModule {}
