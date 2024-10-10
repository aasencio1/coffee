import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Inject, Param, Patch, Post, Query, Res } from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { response } from 'express';
import { CreateCoffeeDto } from './dto/create-coffee.dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto/update-coffee.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto/pagination-query.dto';
import { REQUEST } from '@nestjs/core';

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
@Get()
findALL(@Query() paginationQuery: PaginationQueryDto){
      //  const { limit, offset} = paginationQuery;
    //return `Esta funcion retorna todos los cafes. Limit: ${limit}, offset: ${offset}`; //http://localhost:3000/coffees?limit=20&offset=10 (query parameters)
     return this.coffeesService.findAll(paginationQuery); 
    //return "primer get a pulmon";
}

@Get(':id')
 findOne (@Param('id') id: number){   // if we changes string to number, validationPipe make convert String to number
    console.log(typeof id);   // Print what is the current data type on run execution. 
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
