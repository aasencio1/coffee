import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';

@Injectable()
export class CoffeesService {

  constructor(
     @InjectRepository(Coffee)
     private readonly coffeeRepository: Repository <Coffee>,
  ){}

/*-private coffees = [
   {
     id:1,
     name: 'Shipwreck Roast',
     brand: 'Buddy Brew',
     flavors: ['chocolate','vanilla'],
   },
 ];*/

 findAll(){
   // return this.coffees;
   return this.coffeeRepository.find();
 }

 async findOne (id: string){
    // throw 'A ramdom Error';
   // const coffee = this.coffees.find(item=> item.id ===+id)
   //await para funciones asincronas y await se usa para esperar funciones marcadas como asincronas
   const coffee = await this.coffeeRepository.findOne({ where: { id : +id  }});
    if (!coffee){ //manejo de errores
        //throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND);
        throw new NotFoundException (`Coffee #${id} not found`)
    }
    return coffee;
 }
 create(createCoffeeDto: CreateCoffeeDto)   // any: no se valida el tipo de datos, es decir puede ser cualquier tipo de datos
 {
  // this.coffees.push(createCoffeeDto);
  const coffee = this.coffeeRepository.create(createCoffeeDto)
  return this.coffeeRepository.save(coffee);
  //return createCoffeeDto; // if it is return enable, you can see the response json. If do not, the response is "no body returned for response"
 } 

 async update(id: string, updateCoffeeDto: UpdateCoffeeDto)   //antes any ...
 {
   /* const existingCoffee = this.findOne(id);
    if (existingCoffee)
        {
            // updating the existing entity
        }
    */ 
    const coffee = await this.coffeeRepository.preload ({
      id: +id,
      ...updateCoffeeDto   //copia todo lo que tiene del updateCoffeeDto en la carga del objetotraido de DB 
    }) 
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


}
