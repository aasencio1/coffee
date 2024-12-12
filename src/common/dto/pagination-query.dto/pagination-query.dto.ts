import { Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";

export class PaginationQueryDto {
    @IsOptional()
    @IsPositive()
    @Type(()=> Number)  //  habilitando en el inicio transformOptions:{enableImplicitConversion: true} limit: number; no se requiere asociar para una propiedad 
    limit: number;

    @IsOptional()
    //@IsPositive()   *considerarlo luego incluyendo el 0
    @Type(()=> Number)
    offset: number;
}
