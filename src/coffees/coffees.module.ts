import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity/flavor';
import { Event } from 'src/events/entities/event.entity/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';

//Rule: By Default, All Modules encapsulate their providers. 
//Rule: If you want ti be Public API of the Module, use word "exports".

//class MockCoffeeService {}

@Module({  
         imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],  // Configurar Entidades especificas dentro de un modulo 
         controllers: [CoffeesController],
         providers: [ CoffeesService,
         {
         //   provide: CoffeesService,   useClass: CoffeesService,    // Providers TOKEN are related with the business use case
         //  provide: CoffeesService, useValue: new MockCoffeeService(), //En lugar de usar el servicio completo CoffeesService, 
         //se está inyectando un servicio simulado (MockCoffeeService) usando la propiedad useValue
         provide: COFFEE_BRANDS, useValue: ['buddy brew', 'nescafe']
         },
         ],
         exports: [CoffeesService],  // It makes PUBLIC API
        
       })

export class CoffeesModule {}
