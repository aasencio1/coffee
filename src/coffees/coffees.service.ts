import { HttpException, HttpStatus, Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { DataSource, Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';
import { Flavor } from './entities/flavor.entity/flavor';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { Event } from 'src/events/entities/event.entity/event.entity';

import { COFFEE_BRANDS } from './coffees.constants';
import { ConfigService, ConfigType } from '@nestjs/config';
import coffeesConfig from './config/coffees.config';

/*  // inyectar la clave generada en un servicio como lo harías normalmente.
  export class ApiService {
     constructor(@Inject('API_KEY') private readonly apiKey: string) {}

  getApiKey(): string {
    return this.apiKey;
  }
*/
// Scope: DEFAULT, TRANSIENT, REQUEST

@Injectable( {scope: Scope.DEFAULT} )   //Scope.DEFAULT is used to the most cases. Scope.REQUEST
export class CoffeesService {     //esto es una clase provider 

  constructor(
     @InjectRepository(Coffee)
     private readonly coffeeRepository: Repository <Coffee>,
     @InjectRepository(Flavor)
     private readonly flavorRepository: Repository <Flavor>,
     private readonly dataSource: DataSource,   // usada en type orm 0.3.x . los datos registrado en en Objeto de configuracion forRoot en NestJs, se utilizan para configurar el DataSource en TypeORM
     @Inject(coffeesConfig.KEY)
     private readonly coffeesConfiguration: ConfigType<typeof coffeesConfig>,   //ConfigType es un HelperType 
     private readonly configService : ConfigService,
     // private readonly connection: Connection,  //usada en type orm 0.2.x
   //  @Inject ('COFFEE_BRANDS') coffeeBrands: string[],  //Inyectas valores o instancias que no son clases, como constantes o configuraciones.
    @Inject (COFFEE_BRANDS) coffeeBrands: string[], //El decorador @Inject() es necesario cuando el token no se puede inferir automáticamente  (el token es equivalente al nombre del repositorio que se estab inyectando)
   
    //por el tipo de clase, lo que ocurre cuando usamos tokens personalizados como strings.
  ){
   // const databaseHost = this.configService.get<string>('DATABASE_HOST','localhost');  
    const databaseHost = this.configService.get('database.host','localhost');
    //const coffeesConfig = this.configService.get('coffees.foo');   //passing the partial name registrated
    //console.log(coffeesConfig);
    console.log(databaseHost);
    //console.log(coffeeBrands);  // se imprime los los valores [ 'buddy brew', 'nescafe' ]
    console.log(coffeesConfiguration.foo);  //access the object directly instead of using the get method; you can specific properties of the partial config using dot (.) notation 
    console.log('PASSED - Coffee Services Instanciated');
  }

/*-private coffees = [
   {
     id:1,
     name: 'Shipwreck Roast',
     brand: 'Buddy Brew',
     flavors: ['chocolate','vanilla'],
   },
 ];*/

 findAll(paginationQuery : PaginationQueryDto){
   const { limit, offset } = paginationQuery;
   // return this.coffees;
   return this.coffeeRepository.find({     // inside here, we are preparing to communicate with the database
    relations: { 
        flavors: true,     // connected with flavor Entity  
    },
    skip: offset,   // how many is going to skip it ?
    take: limit,    // how many is going to be consider
   });
 }

 async findOne (id: string){
    // throw 'A ramdom Error';
   // const coffee = this.coffees.find(item=> item.id ===+id)
   //await para funciones asincronas y await se usa para esperar funciones marcadas como asincronas
   const coffee = await this.coffeeRepository.findOne({ 
      where: { 
        id : +id  
      },
      relations:{
        flavors: true,
      } 
    });
    if (!coffee){ //manejo de errores
        //throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND);
        throw new NotFoundException (`Coffee #${id} not found`)
    }
    return coffee;
 }

 async create(createCoffeeDto: CreateCoffeeDto)  { // any: no se valida el tipo de datos, es decir puede ser cualquier tipo de datos
 
   const flavors = await Promise.all(
     createCoffeeDto.flavors.map(name => this.preloadFlavorByName(name)),   // map retorna los resultados en un arreglo.
   );
  
  const coffee = this.coffeeRepository.create({
         ...createCoffeeDto,
        flavors,
        });
        return this.coffeeRepository.save(coffee);
   }
  
  // this.coffees.push(createCoffeeDto); 
  //return createCoffeeDto; // if it is return enable, you can see the response json. If do not, the response is "no body returned for response"

  
 

async update(id: string, updateCoffeeDto: UpdateCoffeeDto){  //antes any ...
   /* const existingCoffee = this.findOne(id);
    if (existingCoffee)
        {
            // updating the existing entity
        }
    */ 
      const flavors = 
       updateCoffeeDto.flavors &&
       (await Promise.all (
        updateCoffeeDto.flavors.map(name=> this.preloadFlavorByName(name)),
       ));
           
      const coffee = await this.coffeeRepository.preload ({
      id: +id,
      ...updateCoffeeDto, 
      flavors, 
    });
    if (!coffee) {
       throw new NotFoundException(`Coffee #${id} not found`);
    }  
    return this.coffeeRepository.save(coffee)         
 }
 

 async remove (id: string)
 {
   const coffee = await this.findOne(id);
   return this.coffeeRepository.remove(coffee);

   /* const coffeeIndex = this.coffees.findIndex(item => item.id === +id)   // comprador estricto de igualdad 
    if (coffeeIndex >=0)
        {
            this.coffees.splice(coffeeIndex, 1);  // splice para modificar el contenido de un arreglo, es decir, al coincidir el valor del indice, se elimina 1 elemento, es decir el
            // elemento actual del arreglo
        }
    */
 } 

 private async preloadFlavorByName (name: string) : Promise<Flavor>{
  const existingFlavor = await this.flavorRepository.findOne({
    where: { name },
  });
  if (existingFlavor) {
      return existingFlavor;
   }
   return this.flavorRepository.create({ name });
 }

  async recommendCoffee(coffee: Coffee){
  const queryRunner = this.dataSource.createQueryRunner();

  await queryRunner.connect();
  await queryRunner.startTransaction();
  try {
        coffee.recommendations++;

        const recommendEvent = new Event;
        recommendEvent.name = 'recommend_coffee';
        recommendEvent.type = 'coffee';
        recommendEvent.payload = { coffedId: coffee.id};

        await queryRunner.manager.save(coffee);
        await queryRunner.manager.save(recommendEvent);


        await queryRunner.commitTransaction();
  } catch(err) {
    await queryRunner.rollbackTransaction();
  } finally{
    await queryRunner.release();
  }
  }

}
