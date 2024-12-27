import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { Mongoose } from 'mongoose';
import { MongooseModule } from '@nestjs/mongoose';
import { Coffee, CoffeeSchema } from './entities/coffee.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Coffee.name,
                schema: CoffeeSchema,
            }
        ])
    ],
    controllers: [CoffeesController],  //Se define los Controladores del Modulo -- Uso de los Principios SOLID
    providers: [CoffeesService]   // Se Define los Conbtroladorreews del Modulo -- Uso de los Principios SOLID
})
export class CoffeesModule {}
