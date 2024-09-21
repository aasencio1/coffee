import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';


// bootstrap es el inicio del programa
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // aplicar como buena practica los axiomas de la teoria de sistemas
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,    //power of DTO and validation's pipe  , avoid passing invalid properties
      transform: true,   // Whe is enble, transfor to the instance that we are especting
      forbidNonWhitelisted: true,  //Whiltelist is relate with all the feature previously listed and defined in the DTO. 
      transformOptions:{
        enableImplicitConversion: true 
      }
    })
  );
  await app.listen(3000);
}
bootstrap();
