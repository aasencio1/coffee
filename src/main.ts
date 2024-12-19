import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
// Apply the ValidationPipe globally in our main.ts file
 app.useGlobalPipes(new ValidationPipe({
    whitelist: true,   // Al indicarlo, se indica que en el cuerpo del post se puede pasar cualquier parametro, lo cual puede ser peligroso
    forbidNonWhitelisted: true,  //al indicarlo, se expresa que solo se aceptan como lista blanca los parametros que estan definido en el DTO
                                 //y cualquier otro parametro o propiedad sera Rechazada y no llegara al COntroller
    transform: true,   // Activando este parametro, y haciendo un Post y creando una instancia de CerateCoffeeDTO. se observa que cambioa de Falso a Verdad
                       // Esto indica que se puede tranasforma el DTO en UNA INSTANIA DE CLASE y Poder manejarlo facilmente 
                      // Como devesntaja de habilitar que el DTO sea una instancia es q se afecte el rendimiento y todos los controladores y servicios depenada de la instancia del DTO
 }));  // Indicar usar los Pipes significa que se usar las validaciones de la Clase Validadora
                          // ValidationPipe usa Internamente class-validator 
                          // Es parte de las abstracciones AL PROGRAMADOR para que asuma que eso funciona y aumente la eficiencia del desarollo (y la dependencia)
                          //Si no se usa los pipes, no se puede usar class-validator, es decir es OBVIADO-
                          // De no usar se debe implementar estas validaciones. 
    
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
