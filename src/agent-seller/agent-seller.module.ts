import { Module } from '@nestjs/common';
import { AgentSellerService } from './agent-seller.service';
import { AgentSellerController } from './agent-seller.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [AuthModule],
  controllers: [AgentSellerController],
  providers: [AgentSellerService],
})
export class AgentSellerModule {}
