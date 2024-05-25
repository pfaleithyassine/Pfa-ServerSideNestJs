import {  ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { UserDto } from './dto/user.dto';
import { hash } from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { EtatUser } from './enum/etatuser.enum';
import { UpdateUserDto } from './dto/updateUser.dto';

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
        if (UserExists) {
            throw new ConflictException("User already exists");
        }else {
            const user = await this.userRepository.create(userDto);
            user.profileImage = `http://localhost:5000/uploads/${filename}`;
            user.password = await hash(user.password,10);
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
    async desactivateUser(id:number){
        const user = await this.userRepository.findOne({where:{id}});
        if (user.isActivate){
            user.isActivate = EtatUser.DESACTIVATED;
            await this.userRepository.save(user);
            return {"message":"User desactivated successfully"}
             
        }else {
           return {"message":"User already desactivated "}
        } 
    }
    async activateUser(id:number){
        const user = await this.userRepository.findOne({where:{id}});
        if (!user.isActivate){
            user.isActivate = EtatUser.ACTIVATED;
            await this.userRepository.save(user);
            return {"message":"User activated successfully"}
             
        }else {
           return {"message":"User already activated "}
        } 
    }
    async updateUser(id:number,userDto:UpdateUserDto){
        const user = await this.userRepository.findOne({where:{id}});
        const existUserByEmail = await this.userRepository.findOne({where:{email:userDto.email}});
        console.log(existUserByEmail)
        if (existUserByEmail && existUserByEmail.id != user.id){
            return {"message":"Email already exists"}
        }
        if (user ){
            user.name = userDto.name;
            user.email = userDto.email;
            //user.password = userDto.password;
            //user.role = userDto.role;
            return await this.userRepository.save(user);
        }else {
            return {"message":"User not found"}
        }
    }
   

}
