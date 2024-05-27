import { Injectable } from '@nestjs/common';
import { ContractDto } from './dto/contract.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Contract } from './contract.entity';
import { Product } from 'src/products/products.entity';
import { Repository } from 'typeorm';
import { User } from 'src/user/user.entity';
import { Purchase } from 'src/purchases/purchase.entity';

@Injectable()
export class ContractService {
    constructor(
        @InjectRepository(User) private readonly userRepository: Repository<User>,
        @InjectRepository(Product) private readonly productRepository: Repository<Product>,
        @InjectRepository(Contract) private readonly contractRepository: Repository<Contract>,
        @InjectRepository(Purchase) private readonly purchaseRepository: Repository<Purchase>,
    ) {}

    async createContract(contractDto: ContractDto) {
       
        const contract = new Contract();
        contract.name = contractDto.name;
        contract.description = contractDto.description;
        contract.price = contractDto.price;
      
        //contract.user = await this.userRepository.findOne({where:{id:contractDto.user}});    
      
        const savedContract = await this.contractRepository.save(contract);
    
        return { message: 'Contract created' };
    }

    async getContracts() {
        return await this.contractRepository.find();
    }
}
