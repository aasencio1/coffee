import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';

@Module({
    controllers: [CoffeesController],  //Se define los Controladores del Modulo -- Uso de los Principios SOLID
    providers: [CoffeesService]   // Se Define los Conbtroladorreews del Modulo -- Uso de los Principios SOLID
})
export class CoffeesModule {}
