import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Patch, Post, Put, Query, Res } from '@nestjs/common';
//import { response } from 'express';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';

@Controller('coffees')
export class CoffeesController {
    constructor(private readonly coffeesService: CoffeesService){}

@Get ()
findAll(@Query() paginationQuery) { //@Res() response es un metodod e Express //@Query es para pasar parametros de busqueda  por el get 
  //response.status(200).send('This action returns all coffees');  // No es una buena practica usar directamente express
   // const { limit, offset } = paginationQuery;
    //return `This action returns all coffees. Limit ${limit}, offset: ${offset}`;  //limit: cuantos retorna, offser: cuales omito  
    return this.coffeesService.findAll();
}
@Get(':id')
  //findOne(@Param ('id') id: string) {   //Todo query PARAMETER By Default es String
    findOne(@Param ('id') id: number) {
    //return `This action returns #${id} coffee`;
    console.log(typeof id);
    return this.coffeesService.findOne(''+id);
}
  @Post()
 // @HttpCode()  // formatea estaticamente el codigo de respuesta HttpStatus.GONE


  //create(@Body() body) {   // al agregar el parametro filtro el POST, indicando especificas propiedades. 
  create(@Body() createCoffeeDto:CreateCoffeeDto) {       //Le estoy pasando el DTO como tipo o Clase creada
    console.log(createCoffeeDto instanceof CreateCoffeeDto)   // instanceOf verifica si el Objeto que se recibe es una Intancia de una Clase o No, devolviendo un Logico


  //return body;
    // return `This action creates a coffee`;
    return this.coffeesService.create(createCoffeeDto);
}
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    //return `This action updates #${id} coffee`;
    return this.coffeesService.update(id, updateCoffeeDto);
  }
  

  @Delete(':id')
  remove(@Param('id') id: string) {
  //  return `This action removes #${id} coffee`;
  return this.coffeesService.remove(id);
  }


}
