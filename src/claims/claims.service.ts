import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserClaimDto } from './dto/Userclaims.dto';
import { User } from 'src/user/user.entity';
import { Claims } from './claims.entity';
import { Purchase } from 'src/purchases/purchase.entity';

@Injectable()
export class ClaimsService {
    constructor(@InjectRepository(Claims) private userclaimRepository: Repository<Claims>,
                @InjectRepository(User) private userRepository: Repository<User>,
                @InjectRepository(Purchase) private purchaseRepository: Repository<Purchase>,

){}

    async getAllClaims():Promise<Claims[]>{
        return await this.userclaimRepository.find();
    }

    async saveClaim(userclaim:UserClaimDto, filename:string){
        const claim = await this.userclaimRepository.create(userclaim);
        claim.claimImage = `http://localhost:5000/uploads/${filename}`;
        const purchase = await this.purchaseRepository.findOne({ where: { id: userclaim.purchaseId } } );
        claim.purchase = purchase;
        return await this.userclaimRepository.save(claim);
    }
    
}


