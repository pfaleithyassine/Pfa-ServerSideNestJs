import { Controller } from '@nestjs/common';
import { AgentSellerService } from './agent-seller.service';

@Controller('agent-seller')
export class AgentSellerController {
  constructor(private readonly agentSellerService: AgentSellerService) {}
}
