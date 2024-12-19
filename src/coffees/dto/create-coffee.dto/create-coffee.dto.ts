import { IsString } from "class-validator";
// reglas a cerca de lo que se espera 
export class CreateCoffeeDto {
    @IsString()
    readonly name: string;    //de define readonly para que no pueda ser modificado, una vez inicializado (inmutabilidad de la propiedad)

    @IsString()
    readonly brand: string;

    @IsString({ each: true })
    readonly flavors: string[];
}
