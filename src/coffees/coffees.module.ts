import { Module, Scope } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity/flavor';
import { Event } from 'src/events/entities/event.entity/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';
import { Connection, DataSource } from 'typeorm';

//Rule: By Default, All Modules encapsulate their providers. 
//Rule: If you want ti be Public API of the Module, use word "exports".

//class MockCoffeeService {}
 
@Module({  
         imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])],  // Configurar Entidades especificas dentro de un modulo 
         controllers: [CoffeesController],
         /*providers: [  // Ejemplo de un Provider usando USECLASS
            {
              provide: CoffeesService,   // Durante pruebas...
              useClass: MockCoffeesService,  // Se usa el MockCoffeesService en lugar de la implementación real
            },
            Sin embargo, también puedes usar useClass de manera permanente en escenarios donde necesitas una inyección dinámica o
            modular de diferentes implementaciones en función de entornos o casos de uso específicos.
          ] */
           /* providers: [  // Ejemplo de una Clase Usando UseFactory 
                {
                  provide: 'API_KEY',
                  useFactory: () => {
                    // Genera dinámicamente la API key según el entorno
                    const isProduction = process.env.NODE_ENV === 'production';
                    return isProduction ? 'prod-api-key' : 'dev-api-key';
                  },
                },
              ],*/
         providers: [ CoffeesService,
         
         //   provide: CoffeesService,   useClass: CoffeesService,    // Providers TOKEN are related with the business use case
         //  provide: CoffeesService, useValue: new MockCoffeeService(), //En lugar de usar el servicio completo CoffeesService, 
         //se está inyectando un servicio simulado (MockCoffeeService) usando la propiedad useValue
         //provide: COFFEE_BRANDS, useValue: ['buddy brew', 'nescafe']
         { provide: COFFEE_BRANDS, 
          //useFactory: () => ['buddy brew', 'nescafe']  , 
         
          useFactory: async (dataSource: DataSource): Promise<string[]> =>{
          const coffeeBrands = await Promise.resolve(['buddy brew','netscafe']);
          console.log('[!] Async factory');
          return coffeeBrands;
          },
         // scope: Scope.REQUEST, 
        },
         // inject: [CoffeesService],
         //} , 
         ],
         exports: [CoffeesService],  // It makes PUBLIC API
        
       })

export class CoffeesModule {}
