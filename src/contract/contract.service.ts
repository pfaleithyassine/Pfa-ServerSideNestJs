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
        console.log(contractDto.user)
        const purchaseDone = await this.purchaseRepository
        .createQueryBuilder('purchase')
        .where("purchase.userId = :userId", { userId:contractDto.user })
        .andWhere("purchase.productId = :productId", { productId:contractDto.product })
        .getOne();
        if (!purchaseDone) {
            return { message: 'Purchase not found' };
        }    
        const contract = new Contract();
        contract.name = contractDto.name;
        contract.description = contractDto.description;
        contract.price = contractDto.price;
        contract.dateFin = new Date(contractDto.dateFin);
        //contract.user = await this.userRepository.findOne({where:{id:contractDto.user}});    
        contract.product = await this.productRepository.findOne({where:{id:contractDto.product}});
        const savedContract = await this.contractRepository.save(contract);
        console.log(savedContract.dateDebut)
        console.log(savedContract.dateFin.getFullYear() )
        return { message: 'Contract created' };
    }

    async getContracts() {
        return await this.contractRepository.find();
    }
}
