import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";



@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private readonly reflactor:Reflector){

    }
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        console.log(request.user.role)
        const role = this.reflactor.getAllAndOverride('role',[context.getHandler(),context.getClass()])
        if (role && !role.includes(request.user.role)){
            throw  new ForbiddenException('You are not allowed to do  this action');
        }
       return true;
    }
}