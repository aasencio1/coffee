import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class CoffeesService {
 private coffees = [
   {
     id:1,
     name: 'Shipwreck Roast',
     brand: 'Buddy Brew',
     flavors: ['chocolate','vanilla'],
   },
 ];

 findAll(){
    return this.coffees;
 }

 findOne (id: string){
    // throw 'A ramdom Error';
    const coffee = this.coffees.find(item=> item.id ===+id)
    if (!coffee){ //manejo de errores
        //throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND);
        throw new NotFoundException (`Coffee #${id} not found`)
    }
    return coffee;
 }
 create(createCoffeeDto: any)   // no se valida el tipo de datos, es decir puede ser cualquier tipo de datos
 {
  this.coffees.push(createCoffeeDto);
  return createCoffeeDto; // if it is return enable, you can see the response json. If do not, the response is "no body returned for response"
 } 

 update(id: string, updateCoffeeDto: any)
 {
    const existingCoffee = this.findOne(id);
    if (existingCoffee)
        {
            // updating the existing entity
        }
 }

 remove (id: string)
 {
    const coffeeIndex = this.coffees.findIndex(item => item.id === +id)   // comprador estricto de igualdad 
    if (coffeeIndex >=0)
        {
            this.coffees.splice(coffeeIndex, 1);  // splice para modificar el contenido de un arreglo, es decir, al coincidir el valor del indice, se elimina 1 elemento, es decir el
            // elemento actual del arreglo
        }
 } 


}
