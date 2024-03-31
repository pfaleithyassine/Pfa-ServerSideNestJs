import { Body, Controller,  Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto } from './dto/auth.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() dto:AuthDto) {
    return this.authService.login(dto);
  }

  
  @Post('register')
  async register(@Body() dto:RegisterDto) {
    return   this.authService.register(dto);
  }

  
}
