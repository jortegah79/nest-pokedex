import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT=process.env.PORT || 3000
  app.useGlobalPipes(new ValidationPipe({
    whitelist:true,
    forbidNonWhitelisted:true,
    //para permitir que se realice una transformación hacia los modelos 
    transform:true,
    transformOptions:{
      enableImplicitConversion:true
    }
  }));
  app.setGlobalPrefix("api/v2");
  await app.listen(PORT);
}
bootstrap();
