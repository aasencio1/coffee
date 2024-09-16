import { PartialType } from "@nestjs/mapped-types";
import { CreateCoffeeDto } from "../create-coffee.dto/create-coffee.dto";

export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto){   // Importa la clase de la cual heredara el comportamiento ; inherit all the validation
    //aplies to the validation on CreateCoffeeDto
    // use question mark after the name of the property means optional. 
   /* readonly name?: string;
    readonly  brand?: string;
    readonly flavors?: string[];*/
}
