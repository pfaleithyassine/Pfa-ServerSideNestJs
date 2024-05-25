import { Body, Controller, Post } from '@nestjs/common';
import { ContractService } from './contract.service';
import { ContractDto } from './dto/contract.dto';

@Controller('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}


  @Post("/save")
  async createContract(@Body() contractDto: ContractDto) {
    console.log(contractDto)
    return this.contractService.createContract(contractDto);
  }
}
