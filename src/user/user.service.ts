import {  ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {

    constructor(@InjectRepository(User) private userRepository:Repository<User>,
    private readonly jwtService:JwtService
    
    ){}

    async getAllUsers():Promise<User[]>{
        return await this.userRepository.find();
    }
   async saveUser(userDto:UserDto,filename:string){
        const UserExists = await this.userRepository.findOne(
             {where:{email:userDto.email}}
            );
            console.log(UserExists)
        if (UserExists) {
            throw new ConflictException("User already exists");
        }else {
            const user = await this.userRepository.create(userDto);
            user.profileImage = `http://localhost:5000/uploads/${filename}`;
            user.password = await hash(user.password,10);
            console.log(user)
            return await this.userRepository.save(user);
        }
  
   
      
    }

    async deleteUser(id:number){
        return await this.userRepository.delete(id);
    }

    async getUserInfoFromToken(token:string){
        
            const myInfo = this.jwtService.decode(token);
            return myInfo;
          }

    async getUser(id:number){
        return await this.userRepository.findOne({where:{id}});
    
    }      
    
}
