import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesController } from './coffees/coffees.controller';
import { CoffeesService } from './coffees/coffees.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    CoffeesModule, 
    TypeOrmModule.forRoot({
       type: 'postgres',
       host: 'localhost',
       port: 5432,
       username: 'postgres',
       password: 'pass123',
       database: 'postgres',
       autoLoadEntities: true,
       synchronize: true,   // desable in production , esto debido que al ejecutar reconstruye la base de datos
                            /*
                             TypeORM compara las entidades de tu código con las tablas en la base de datos y,
                             si detecta diferencias, las ajusta automáticamente (crea o modifica tablas, columnas, índices, etc.).
                             */ 
                             /*
                             En producción, es más seguro utilizar migraciones para aplicar cambios controlados en la base de datos.
                             */
    })  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
