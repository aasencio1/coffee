import { Module, ValidationPipe } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesController } from './coffees/coffees.controller';
import { CoffeesService } from './coffees/coffees.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';
import appConfig from './config/app.config';
import { APP_PIPE } from '@nestjs/core';


@Module({
      // Define validation for input to envirotnment file.
       /*ConfigModule.forRoot ({
       validationSchema: Joi.object(
        {  // Input Variable to the System environment
          DATABASE_HOST: Joi.required(),
          DATABASE_PORT: Joi.number().default(5432),
        })
      
      /*{ 
            .envFilePath: '.environment',  //to spcify antother path option //is looking for a .environment file 
      //or
      ignoreEnvFile:true,  //in that case, it will ignore env file entirely
      }
       }),*/
    imports: 
    [
              TypeOrmModule.forRootAsync   // it's loaded after every registered module is resolved ; that means load:[appConfig]  
              (
                {
                  useFactory: () =>
                  (
                     {
                      type: 'postgres',
                      host: process.env.DATABASE_HOST,
                      port: +process.env.DATABASE_PORT || 5432,
                      username: process.env.DATABASE_USER,
                      password: process.env.DATABASE_PASSWORD,
                      database: process.env.DATABASE_NAME,
                      autoLoadEntities: true,
                      synchronize: true,   // desable in production , esto debido que al ejecutar reconstruye la base de datos
                                          /*
                                          TypeORM compara las entidades de tu código con las tablas en la base de datos y,
                                          si detecta diferencias, las ajusta automáticamente (crea o modifica tablas, columnas, índices, etc.).
                                          */ 
                                          /*
                                          En producción, es más seguro utilizar migraciones para aplicar cambios controlados en la base de datos.
                                          */
                     }
                  ),
                

                    /*host: process.env.DATABASE_HOST,
                  port: +process.env.DATABASE_PORT,
                  username: process.env.DATABASE_USER,
                  password: process.env.DATABASE_PASSWORD,
                  database: process.env.DATABASE_NAME,*/
                
                }
              ),
              ConfigModule.forRoot(
                                    {
                                     load:[appConfig]  
                                    }
                                  ),
              CoffeesModule, 
              
              CoffeeRatingModule,
              DatabaseModule
    ],
  controllers: [AppController],
  providers: 
  [
    AppService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule {}
