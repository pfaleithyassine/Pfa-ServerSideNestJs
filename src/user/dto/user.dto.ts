import { IsEmail, IsString, Length } from "class-validator";
import { Role } from "../role.entity";

export class UserDto{
    
    id:number;
    @IsString({message:"name must be a string"})
    name:string;
    @IsEmail({},{message:"email is not valid"})
    email:string;
    @IsString()
    @Length(4,12,{message:"password must be between 4 and 20 caracters"})
    password:string;
    
    @IsString()
    role:Role;

}