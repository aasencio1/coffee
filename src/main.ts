import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/filters/http-exception/http-exception.filter';
import { ApiKeyGuard } from './common/guards/api-key/api-key.guard';


// bootstrap es el inicio del programa
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Based on SOLID PRINCIPLES
  // aplicar como buena practica los axiomas de la teoria de sistemas
  // Building Blocks
  // A- Exception FIlter - handling exception that may unhandle (Axiom 1)
  // B - PIPES - Transformation- (Axioma 3) and  validations input (Axioma 4)
  // C- Guards - A given request need certain conditions (authentication, authorization, rol, acl ) (axioma 4)
  // D- Interceptor - interceptor for adding code before or after method execution // Extende basic behaviour // owverwrite methods (axiom 3)// Inspired on Aspect Oriented Progreamming Techinique 
  
  // , guards for ACLs,app.useGlobalPipes(      // Option to set up a pipe directly from sinide a Nest Module
    new ValidationPipe({    // we can not inject any dependency here. 
      whitelist: true,    //power of DTO and validation's pipe  , avoid passing invalid properties
      transform: true,   // Whe is enble, transfor to the instance that we are especting
      forbidNonWhitelisted: true,  //Whiltelist is relate with all the feature previously listed and defined in the DTO. 
      transformOptions:{
        enableImplicitConversion: true 
      }
    })
  //);
  //app.useGlobalFilters(new HttpExceptionFilter());
 app.useGlobalGuards(new ApiKeyGuard());  // it was change return value to false - everythinh is deny (forbidden)
  await app.listen(3000);
}
bootstrap();
