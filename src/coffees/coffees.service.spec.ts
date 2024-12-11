import { Test, TestingModule } from '@nestjs/testing';
import { CoffeesService } from './coffees.service';
import { DataSource, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Flavor } from './entities/flavor.entity/flavor';
import { Coffee } from './entities/coffee.entity';
import { COFFEE_BRANDS } from './coffees.constants';
import coffeesConfig from './config/coffees.config';
import { ConfigService } from '@nestjs/config';
import { NotFoundException } from '@nestjs/common';
//type MockRepository<T= any> = Partial <Record<keyof Repository <T>, jest.Mock>>;
type MockRepository<T = any> = Partial<Record<keyof Repository<T>, jest.Mock>>;

// type define un alias; 
// Partial, indica que los valores de la propiedad son opcionales,
// Record, que define un tipo del tipo clave - valor
// keyof, que indica que los valores de un tipo o interfaz, son devueltos como una union, ó or.


const createMockRepository = <T= any>(): MockRepository<T> => ({
  findOne: jest.fn(),
  create: jest.fn(),
})
 



describe('CoffeesService', () => {
  let service: CoffeesService;
  let coffeeRepository: MockRepository<Coffee>;

beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      CoffeesService,
      {
        provide: getRepositoryToken(Coffee),
        useValue: createMockRepository(),
        //useClass: Repository, // Mock para Coffee Repository
      },
      {
        provide: getRepositoryToken(Flavor),
        useValue: createMockRepository(),
        //useClass: Repository, // Mock para Flavor Repository
      },
      {
        provide: DataSource,
        useValue: {}, // Mock para DataSource
      },
      {
        provide: coffeesConfig.KEY,
        useValue: { foo: 'mockFoo' }, // Mock para configuración
      },
      {
        provide: ConfigService,
        useValue: {
          get: jest.fn().mockReturnValue('mockDatabaseHost'),
        }, // Mock para ConfigService
      },
      {
        provide: COFFEE_BRANDS,
        useValue: ['mockBrand1', 'mockBrand2'], // Mock para COFFEE_BRANDS
      },
    ],
  }).compile();
    service = module.get<CoffeesService>(CoffeesService);
    coffeeRepository = module.get<MockRepository>(getRepositoryToken(Coffee));
    
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  // unit test 1
  describe('findOne', () => {
  // let service: CoffeesService;
   describe('when coffee with ID exists', () => {
     it('should return the coffee object', async () => {
       const coffeeId = '1';
       const expectedCoffee = {};   // se crea un objeto vacio
 
       coffeeRepository.findOne.mockReturnValue(expectedCoffee);
       const coffee = await service.findOne(coffeeId);
       expect(coffee).toEqual(expectedCoffee);
     });
     describe('otherwise', () => {
      //El propósito de este test es validar el comportamiento del método findOne cuando no se encuentra un café con el ID proporcionado
       it('should throw the "NotFOundException"', async () => {
          const coffeeId= '1';
          coffeeRepository.findOne.mockReturnValue(undefined);   //simula que no existe en base de datos
          try{
            await service.findOne(coffeeId);
            expect(false).toBeTruthy();     //se forza a que el test falle en caso de no lanzar excepcion       
          }catch (err){
            expect(err).toBeInstanceOf(NotFoundException);  // asegura que la excepcion lanzada sea No Found Excepction
            expect(err.message).toEqual(`Coffee #${coffeeId} not found`); //Verifica que el mensaje de error sea el esperado: Coffee #1 not found.
          }
       });
     });
   });
   
});

 /*
  describe('otherwise', () => {
    it('should throw the "NotFoundException"', async () => {
      const coffeeId = '1';
      coffeeRepository.findOne.mockReturnValue(undefined);

      try {
        await service.findOne(coffeeId);
        expect(false).toBeTruthy(); // we should never hit this line
      } catch (err) {
        expect(err).toBeInstanceOf(NotFoundException);
        expect(err.message).toEqual(`Coffee #${coffeeId} not found`);
      }
    });
  });*/
});
