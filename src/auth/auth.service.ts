import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Role } from 'src/user/enum/role.enum';
import { JwtService } from '@nestjs/jwt';
import { EtatUser } from 'src/user/enum/etatuser.enum';
import { Insurance } from 'src/user/insurance.entity';
import { AgentSeller } from 'src/user/agentSeller.entity';
import { RepairMember } from 'src/user/repairMember.entity';

@Injectable()
export class AuthService {

    constructor(@InjectRepository(User) private userRepository:Repository<User> ,
                @InjectRepository(Insurance) private insuranceRepository:Repository<Insurance>,
                @InjectRepository(AgentSeller) private agentRepository:Repository<AgentSeller>,
                @InjectRepository(RepairMember) private repairRepository:Repository<RepairMember>,
                private jwtService:JwtService
    ){}
    async register(dto: any) {
        const {name,email,password,role} = dto
        console.log("service",role)
        switch (dto.role) {
            case Role.USER:
                const condidate = await this.userRepository.findOne({where:{email}})  
                if (condidate) {
                    throw new BadRequestException(`User with ${email} already exists`)
                }
                const hashedPassword1 = await this.hashPassword(password)
                await this.userRepository.save({
                    name,
                    email,
                    password:hashedPassword1,
                    role: Role.USER,
                })
                return {message:'User created successfully'};

                
            case Role.REPAIR:
                const candidateRepair = await this.repairRepository.findOne({where:{email}})
                if (candidateRepair) {
                    throw new BadRequestException(`User with ${email} already exists`)
                }
                const hashedPassword2 = await this.hashPassword(password)
                await this.repairRepository.save({
                    name,
                    email,
                    password:hashedPassword2,
                    role: dto.role,
                })
                return {message:'User created successfully'};

                
            case Role.INSURANCE:
                const candidateInsurance = await this.insuranceRepository.findOne({where:{email}})
                if (candidateInsurance) {
                    throw new BadRequestException(`User with ${email} already exists`)
                }
                const hashedPassword3 = await this.hashPassword(password)
                await this.insuranceRepository.save({
                    name,
                    email,
                    password:hashedPassword3,
                    role: dto.role,
                })
                
                return {message:'User created successfully'};
                
            case Role.SELLER:
                const candidateSeller = await this.agentRepository.findOne({where:{email}})
                if (candidateSeller) {
                    throw new BadRequestException(`User with ${email} already exists`)
                }
                const hashedPassword4 = await this.hashPassword(password)
                await this.agentRepository.save({
                    name,
                    email,
                    password:hashedPassword4,
                    role: dto.role,
                })
                return {message:'User created successfully'};

                
        
        }
        //const candidate = await this.userRepository.findOne({where:{email}})
   /*      const hashedPassword = await this.hashPassword(password)
        await this.userRepository.save({
            name,
            email,
            password:hashedPassword,
            role: Role.USER,
        })
 */
        //return {message:'User created successfully'};
    }

    async login(dto: any) {
        const {email,password} = dto
        const candidate: User = await this.userRepository.findOne({where:{email}})
       console.log(candidate)
        if (!candidate) {
            throw new BadRequestException(`Wrong Credentials`)
        }
        if (candidate.isActivate === EtatUser.DESACTIVATED) {
            throw new BadRequestException(`this account has been desactivated`)
        }
        const isMatch = await this.comparePassword({password,hashedPassword:candidate.password})
        if (!isMatch) {
            throw new BadRequestException(`Wrong Credentials`)
        }
        
        const token = await this.signToken({id:candidate.id,name:candidate.name,email:candidate.email,role:candidate.role})

        return {token};
    }
    async loginAgent(dto: any) {
        const {email,password} = dto
        const candidate: AgentSeller = await this.agentRepository.findOne({where:{email}})
       console.log(candidate)
        if (!candidate) {
            throw new BadRequestException(`Wrong Credentials && email not found`)
        }
        if (candidate.isActivate === EtatUser.DESACTIVATED) {
            throw new BadRequestException(`this account has been desactivated`)
        }
        const isMatch = await this.comparePassword({password,hashedPassword:candidate.password})
        if (!isMatch) {
            throw new BadRequestException(`Wrong Credentials && pwd`)
        }
        
        const token = await this.signToken({id:candidate.id,name:candidate.name,email:candidate.email,role:candidate.role})

        return {token};
    }
    async loginRepair(dto: any) {
        const {email,password} = dto
        const candidate: RepairMember = await this.repairRepository.findOne({where:{email}})
       console.log(candidate)
        if (!candidate) {
            throw new BadRequestException(`Wrong Credentials`)
        }
        if (candidate.isActivate === EtatUser.DESACTIVATED) {
            throw new BadRequestException(`this account has been desactivated`)
        }
        const isMatch = await this.comparePassword({password,hashedPassword:candidate.password})
        if (!isMatch) {
            throw new BadRequestException(`Wrong Credentials`)
        }
        
        const token = await this.signToken({id:candidate.id,name:candidate.name,email:candidate.email,role:candidate.role})

        return {token};
    }
    async loginInsurance(dto: any) {
            const {email,password} = dto
            const candidate: Insurance = await this.insuranceRepository.findOne({where:{email}})
           console.log(candidate)
            if (!candidate) {
                throw new BadRequestException(`Wrong Credentials`)
            }
            if (candidate.isActivate === EtatUser.DESACTIVATED) {
                throw new BadRequestException(`this account has been desactivated`)
            }
            const isMatch = await this.comparePassword({password,hashedPassword:candidate.password})
            if (!isMatch) {
                throw new BadRequestException(`Wrong Credentials`)
            }
            
            const token = await this.signToken({id:candidate.id,name:candidate.name,email:candidate.email,role:candidate.role})

        return {token};
    }


    async hashPassword(password:string):Promise<string>{
        const saltOrRounds=10
        return await bcrypt.hash(password,saltOrRounds)
    }
    async comparePassword(args:{password:string,hashedPassword:string}){
        return await bcrypt.compare(args.password,args.hashedPassword)
    }
    async signToken(args:{id:number,name:string,email:string,role:Role}){
        const payload = args
        return this.jwtService.signAsync(payload,{secret:'laythouna'})
    }
    async getAgent(id:number){
        return await this.userRepository.findOne({where:{id}})
    }
}
