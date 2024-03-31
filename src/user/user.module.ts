import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { AuthModule } from 'src/auth/auth.module';
import { MulterModule } from '@nestjs/platform-express';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports:[ TypeOrmModule.forFeature([User]),
  AuthModule,
  MulterModule.register({
    dest: 'uploads/',
  
  }),
  JwtModule
],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
