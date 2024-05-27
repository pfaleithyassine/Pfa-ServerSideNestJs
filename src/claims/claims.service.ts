import { Injectable } from '@nestjs/common';
import { UserClaims } from './UserClaims.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserClaimDto } from './dto/Userclaims.dto';
import { User } from 'src/user/user.entity';

@Injectable()
export class ClaimsService {
    constructor(@InjectRepository(UserClaims) private userclaimRepository: Repository<UserClaims>,
                @InjectRepository(User) private userRepository: Repository<User>

){}

    async getAllClaims():Promise<UserClaims[]>{
        return await this.userclaimRepository.find();
    }

    async saveClaim(userclaim:UserClaimDto){
        const user = await this.userRepository.findOne({where:{id:userclaim.user}});
        const claim = new UserClaims();
        claim.description = userclaim.description;
        claim.typeClaim = userclaim.typeClaim;
        claim.user = user;
        
        return await this.userclaimRepository.save(claim);


    }
    
}


