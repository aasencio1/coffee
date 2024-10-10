import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesController } from './coffees/coffees.controller';
import { CoffeesService } from './coffees/coffees.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeRatingModule } from './coffee-rating/coffee-rating.module';
import { DatabaseModule } from './database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot (),
    CoffeesModule, 
    TypeOrmModule.forRoot({
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
    }), CoffeeRatingModule, DatabaseModule  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
