import { Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";

export class PaginationQueryDto {
    @IsOptional()
    @IsPositive()
    limit: number;
   // @Type(()=> Number)  //  habilitando en el inicio transformOptions:{enableImplicitConversion: true} limit: number; no se requiere asociar para una propiedad 
    
    @IsOptional()
    @IsPositive()
    //@Type(()=> Number)
    offset: number;
}
