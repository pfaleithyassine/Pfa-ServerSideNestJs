import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/products.entity';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import { Purchase } from './purchase.entity';

@Injectable()
export class PurchasesService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(Purchase)
        private readonly purchaseRepository: Repository<Purchase>,
      ) {}
      async userBuyProduct(userId: number, productId: number) {
        const product = await this.productRepository.findOne({ where: { id: productId } });
        if (product.stock === 0) {
          return { message: 'Product out of stock' };
        }
        const user = await this.userRepository.findOne({ where: { id: userId } });
        const purchase = new Purchase();
        purchase.product = product;
        purchase.user = user;
        product.stock -= 1;
        await this.productRepository.save(product);
        await this.purchaseRepository.save(purchase);
        return { message: 'Purchase completed' };
    }
}
