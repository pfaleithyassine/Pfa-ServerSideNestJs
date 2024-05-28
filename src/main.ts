import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname,  '..' , '/uploads'),{prefix:'/uploads/'});
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
  /*   transformOptions: {
      enableImplicitConversion: true, // <- This line here
    }, */
  }))
  app.useGlobalInterceptors(
    new ClassSerializerInterceptor(app.get(Reflector))
  );
  app.enableCors({
    origin: true,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  })
  
  await app.listen(5000);
}
bootstrap();
