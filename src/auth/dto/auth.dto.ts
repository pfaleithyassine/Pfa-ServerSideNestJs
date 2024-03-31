import { IsEmail, IsString,  MaxLength,  MinLength } from "class-validator";

export class AuthDto{

    @IsEmail({},{message:"email is not valid"})
    email:string;

    @IsString({message:"password must be a string"})
    @MinLength(4,{message:"password must be at least 4 caracters"})
    @MaxLength(20,{message:"password must be at most 20 caracters"})
    password:string;

}