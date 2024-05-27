import { Body, Controller, Get, Post } from '@nestjs/common';
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

  @Get("/getall")
  async getContracts() {
    console.log("get all contracts")
    return this.contractService.getContracts();
  } 
}
