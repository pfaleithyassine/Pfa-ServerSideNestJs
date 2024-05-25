import { Body, Controller,  Get,  Param,  Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { RegisterDto } from './dto/register.dto';
import { Role } from './role-decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login/admin')
  @Role("admin")
  async loginAdmin(@Body() dto:AuthDto) {
    return this.authService.login(dto);
  }
  @Post('login/user')
  @Role("user")
  async loginUser(@Body() dto:AuthDto) {
    return this.authService.login(dto);
  }
  @Post('login/repair-member')
  @Role("repair")
  async loginRepair(@Body() dto:AuthDto) {
    return this.authService.loginRepair(dto);
  }
  @Post('login/insurance-member')
  //@Role("insurance")
  async loginInsurance(@Body() dto:AuthDto) {

    return this.authService.loginInsurance(dto);
  }
  @Post('login/agent-member')
  //@Role("insurance")
  async loginSeller(@Body() dto:AuthDto) {
    console.log(dto)
    return this.authService.loginAgent(dto);
  }




  
  @Post('register')
  async register(@Body() dto:RegisterDto) {
    console.log("control" ,dto)
    return   this.authService.register(dto);
  }
  @Get('me/:id')
  async me(@Param("id") id:number) {
    return this.authService.getAgent(id);
  }
  
}
