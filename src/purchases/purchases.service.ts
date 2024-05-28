import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/products.entity';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Purchase } from './purchase.entity';
import { Contract } from 'src/contract/contract.entity';

@Injectable()
export class PurchasesService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(Purchase)
        private readonly purchaseRepository: Repository<Purchase>,
        @InjectRepository(Contract)
        private readonly contractRepository: Repository<Contract>,
      ) {}
      async userBuyProduct(userId: number, productId: number,contractId:number, dateFin: Date) {
        const product = await this.productRepository.findOne({ where: { id: productId } });
        console.log(product.stock)
        if (product.stock === 0) {
          return { message: 'Product out of stock' };
        }
        const user = await this.userRepository.findOne({ where: { id: userId } });
        const contract = await this.contractRepository.findOne({ where: { id: contractId } });

        const purchase = new Purchase();
        product.stock -= 1;
        purchase.product = product;
        purchase.contract = contract;
        purchase.dateFin = new Date(dateFin);
        purchase.user = user;
        await this.productRepository.save(product);
        await this.purchaseRepository.save(purchase);
        return { message: 'Purchase completed' };
    }

    

    async getPurchasesByUser(userId: number): Promise<Purchase[]> {
      return await this.purchaseRepository.find({
          where: { user: { id: userId } },
          relations: ['user', 'product', 'contract'],
      });
  }

  
  async  getUserContracts(userId: number): Promise<Contract[]> {
    const contracts = await this.contractRepository
        .createQueryBuilder("contract")
        .innerJoinAndSelect("contract.purchases", "purchase")
        .innerJoinAndSelect("purchase.product", "product")
        .innerJoinAndSelect("purchase.user", "user")
        .where("user.id = :userId", { userId })
        .getMany();

    return contracts;
}

}
