import { Injectable } from '@nestjs/common';
import { Product } from './products.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {

    constructor(@InjectRepository (Product) private productRepository: Repository<Product>){ 
    }

    async getAllProducts():Promise<Product[]>{
        return await this.productRepository.find();
    }
    async saveProduct(product:Product){
        return await this.productRepository.save(product);
    }

}
