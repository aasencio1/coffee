import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { response } from 'express';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
    constructor (private readonly coffeesService: CoffeesService){}
@Get()
// @HttpCode(HttpStatus.FORBIDDEN)
findALL(@Query() paginationQuery){
      //  const { limit, offset} = paginationQuery;
    //return `Esta funcion retorna todos los cafes. Limit: ${limit}, offset: ${offset}`; //http://localhost:3000/coffees?limit=20&offset=10 (query parameters)
     return this.coffeesService.findAll(); 
    //return "primer get a pulmon";
}

@Get(':id')
 findOne (@Param('id') id: number){   // if we changes string to number, validationPipe make convert String to number
    console.log(typeof id);   // Primt what is the current data type on run execution. 
    return this.coffeesService.findOne('' + id);
 }

@Post()
create (@Body() createCoffeDto: CreateCoffeeDto){  //reemplazar body por createCoffeeDto
    //console.log (createCoffeDto instanceof CreateCoffeeDto);
    return this.coffeesService.create(createCoffeDto);
}

@Patch(':id')
update (@Param ('id') id: string, @Body() updateCoffeeDto : UpdateCoffeeDto){      
      return this.coffeesService.update(id, updateCoffeeDto);
    //return `retorna a pulmon el patch "${id} CAFES` ;
}
@Delete(':id') 
 remove(@Param('id') id: string){
    return this.coffeesService.remove(id);
    // return 'return el elemento eliminado a pulmon';
 }


}
