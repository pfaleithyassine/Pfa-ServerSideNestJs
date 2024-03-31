import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/user/role.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(@InjectRepository(User) private userRepository:Repository<User> ,
                private jwtService:JwtService
    
    ){}
    
    async register(dto: any) {
        const {name,email,password} = dto
        const candidate = await this.userRepository.findOne({where:{email}})
        if (candidate) {
            throw new BadRequestException(`User with ${email} already exists`)
        }
        const hashedPassword = await this.hashPassword(password)
        await this.userRepository.save({
            name,
            email,
            password:hashedPassword,
            role: Role.USER,
        })

        return {message:'User created successfully'};
    }

    async login(dto: any) {
        const {email,password} = dto
        const candidate = await this.userRepository.findOne({where:{email}})
        if (!candidate) {
            throw new BadRequestException(`Wrong Credentials`)
        }
        const isMatch = await this.comparePassword({password,hashedPassword:candidate.password})
        if (!isMatch) {
            throw new BadRequestException(`Wrong Credentials`)
        }
        
        const token = await this.signToken({id:candidate.id,email:candidate.email,role:candidate.role})

        return {token};
    }

    async hashPassword(password:string):Promise<string>{
        const saltOrRounds=10
        return await bcrypt.hash(password,saltOrRounds)
    }
    async comparePassword(args:{password:string,hashedPassword:string}){
        return await bcrypt.compare(args.password,args.hashedPassword)
    }
    async signToken(args:{id:number,email:string,role:Role}){
        const payload = args
        return this.jwtService.signAsync(payload,{secret:'laythouna'})
    }
}
