import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Coffee } from './entities/coffee.entity';


// En nestJs cada servicio es un Proveedor

@Injectable()
export class CoffeesService {

    private coffees: Coffee[] =[
        {
          id: 1,
          name: 'Shipwreck Roast',
          brand: 'Buddy Brew',
          flavors: ['chocolate', 'vanilla'],
        },
    ];

    findAll() {
        return this.coffees;
      }
    
      findOne(id: string) {
        //throw 'A random error';  // usarlo cuando hay errores no capturados
        //return this.coffees.find(item => item.id === +id);
        const coffee =this.coffees.find(item => item.id === +id);
        if (!coffee) {
            //throw new HttpException(`Coffee #${id} not found`, HttpStatus.NOT_FOUND);
            //or
            throw new NotFoundException(`Coffee #${id} not found`);

          }
          return coffee;
      }
    
      create(createCoffeeDto: any) {
        this.coffees.push(createCoffeeDto);
        return createCoffeeDto; //relacionado con la activacion de ValidationPipe y el WhiteList:true que usa el Class Validator 
      }
    
      update(id: string, updateCoffeeDto: any) {
        const existingCoffee = this.findOne(id);
        if (existingCoffee) {
          // update the existing entity
        }
      }
    
      remove(id: string) {
        const coffeeIndex = this.coffees.findIndex(item => item.id === +id);
        if (coffeeIndex >= 0) {
          this.coffees.splice(coffeeIndex, 1);
        }
      }
}
