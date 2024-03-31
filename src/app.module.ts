import {  Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';



@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions), 
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:'.env',
    }),
    ServeStaticModule.forRoot({
      serveRoot: '/uploads/',
      rootPath: join(__dirname,'..','..','uploads'),

    }),
    UserModule,
    AuthModule,
    
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  constructor() {
    console.log(`Root path: ${join(__dirname,'..','..', 'uploads')}`);
  }
}
