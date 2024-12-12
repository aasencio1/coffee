import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, ParseIntPipe, Patch, Post, Query, Res, SetMetadata, UsePipes, ValidationPipe } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { response } from 'express';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { REQUEST } from '@nestjs/core';
import { ValidationError } from 'class-validator';
import { Public } from 'src/decorators/public.decorator';
import { Protocol } from 'src/common/decorators/protocol.decorator';
import { ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';

//This applies ti the Controller
//@UsePipes(new ValidationPipe())   //This is super useful when you want to pass in a specific configuration object to the ValidationObject
                                  // It's a best practice to use classes instead instance  (this reduces memory)
/*
Validation Pipe
SCOPE - Control the flow, content, validation on anything in our Application
Global at Module
Controller - At the begin of the Controller
Method
Parameter  
*/      

@ApiTags('coffees')
@Controller('coffees')


export class CoffeesController {
    constructor (
      private readonly coffeesService: CoffeesService,
      @Inject(REQUEST) private readonly request: Request,
     // En resumen, esta línea inyecta el objeto de solicitud HTTP actual (Request) en el controlador, permitiéndote acceder a detalles de la solicitud dentro de las funciones del controlador, como headers, body, parámetros, etc. Esto es útil para manejar datos específicos del cliente o la solicitud en curso.
    )
    {
        console.log('CoffeesController created');
    }

// @HttpCode(HttpStatus.FORBIDDEN)
@UsePipes(ValidationPipe)   //This is super useful when you want to pass in a specific configuration object to the ValidationObject
                                  // It's a best practice to use classes instead instance  (this reduces memory)
// This single setup only apply to this single  fillAll() route handler (operation)
//@UsePipes(ValidationPipe)  // use validationPipe for a local context 
//@SetMetadata('isPublic', true)

//@ApiForbiddenResponse ({ description: 'Forbidden.'})
@ApiResponse({ status: 403, description: 'Forbidden.' })
@Public() // access to a decorator previosly created at /decorators folder   New Decortaor create by myself
@Get()
async findALL(
  //  @Protocol('https') protocol: string, 
    @Query() paginationQuery: PaginationQueryDto){
  // Agregar el Decorador protocol , invoa al decorador, y se eimprime en el ejemplo http. 
//     console.log(protocol);
    // await new Promise (resolve => setTimeout(resolve,5000));
      //  const { limit, offset} = paginationQuery;
    //return `Esta funcion retorna todos los cafes. Limit: ${limit}, offset: ${offset}`; //http://localhost:3000/coffees?limit=20&offset=10 (query parameters)
     return this.coffeesService.findAll(paginationQuery); 
    //return "primer get a pulmon";
}

@Get(':id')
 findOne (@Param('id', ParseIntPipe) id: number){   // if we changes string to number, validationPipe make convert String to number
 //findOne (id: number){
    //console.log(typeof id);   // Print what is the current data type on run execution. 
    console.log(`the current value is "${id}" .`);
    console.log(id);// Si `id` no es un número, ParseIntPipe lanzará una excepción y este bloque no se ejecutará.
    
    return this.coffeesService.findOne('' + id);
 }

@Post()
create (@Body() createCoffeDto: CreateCoffeeDto){  //reemplazar body por createCoffeeDto
    //console.log (createCoffeDto instanceof CreateCoffeeDto);
    return this.coffeesService.create(createCoffeDto);
}

@Patch(':id')
//PARAM scope using ValidationPipe to an specific parameter
//update (@Param ('id') id: string, @Body() updateCoffeeDto : UpdateCoffeeDto){      
  update (@Param ('id') id: string, @Body(ValidationPipe) updateCoffeeDto : UpdateCoffeeDto){      
  return this.coffeesService.update(id, updateCoffeeDto);
    //return `retorna a pulmon el patch "${id} CAFES` ;
}
/*@Delete(':id') 
 remove(@Param('id') id: string){
    return this.coffeesService.remove(id);
    // return 'return el elemento eliminado a pulmon';
 }*/
 @Delete(':id')
 async remove(@Param('id') id: string) {
   await this.coffeesService.remove(id); // Ejecuta la lógica de negocio
   return { message: 'Coffee deleted successfully' }; // Devuelve el mensaje
 }

}
