import { IsString } from "class-validator";

export class CreateCoffeeDto {
    //There are simples objects , not contain any business logic,  methods or anything than requiere testing
    // is a good proactice to define all t5he propertires with readonly feature 

    @IsString()   // class -validator , para validar entradas al sistema
    readonly name: string;

    @IsString()
    readonly brand: string;

    @IsString( { each : true} )  // due tu is an array, each value is especting is string
    readonly flavors: string[];
}
