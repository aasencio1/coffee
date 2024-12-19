import { PartialType } from "@nestjs/mapped-types";
import { CreateCoffeeDto } from "../create-coffee.dto/create-coffee.dto";

export class UpdateCoffeeDto extends PartialType(CreateCoffeeDto) {   //La Clase Hija Hereda las Propiedades de la Clase Clase Padre, asignadola a todas sus propiedades Opcional
    //usando @nestjs/mapped-type se elimina el codigo repetido de la Clase create-coffee.dto

   /* PartialType lo convierte en opciona todas las propiedades de la Clase Coffee.dto
    readonly name?: string;    //de define readonly para que no pueda ser modificado, una vez inicializado (inmutabilidad de la propiedad)
    readonly brand?: string;    // ? signbifica que es  opcional la propiedad
    readonly flavors?: string[];*/
}
