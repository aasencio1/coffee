import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
//import { CoffeesController } from './coffees/coffees.controller';
//import { CoffeesService } from './coffees/coffees.service';
import { CoffeesModule } from './coffees/coffees.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    CoffeesModule,
    MongooseModule.forRoot('mongodb://localhost:27017/nest-course'),
  ],
  controllers: [AppController],  // Se ELIMINA el CoffeesController del Modulo principal y se define dentro del Modulo a usar.
  providers: [AppService], // Se ELIMINA el CoffeesService del Modulo prinicipal y se define dentro del Modulo a usar.
})
export class AppModule {}
