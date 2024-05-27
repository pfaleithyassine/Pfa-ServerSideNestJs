import { Injectable } from '@nestjs/common';
import { Product } from './products.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductDto } from './product.dto';
import { AgentSeller } from 'src/user/agentSeller.entity';

@Injectable()
export class ProductsService {

    constructor(@InjectRepository (Product) private productRepository: Repository<Product>,
                @InjectRepository (AgentSeller) private agentSellerRepository: Repository<AgentSeller>

){ 
    }

    async getAllProducts():Promise<Product[]>{
        return await this.productRepository.find();
    }
    async getProductById(id:number):Promise<Product>{
        return await this.productRepository.findOne( {where:{id} } );
    }
    async saveProduct(product:ProductDto , file:string ){
        const agentSeller = await this.agentSellerRepository.findOne({ where: { id: product.agentSellerId } });

        const saveproduct = await this.productRepository.create({...product,agentSeller});
        
        saveproduct.imageProduct = `http://localhost:5000/uploads/${file}`;

        return await this.productRepository.save(saveproduct);

    }

}
