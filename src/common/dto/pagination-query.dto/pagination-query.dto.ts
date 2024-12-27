import { Type } from "class-transformer";
import { IsOptional, IsPositive } from "class-validator";

export class PaginationQueryDto {
  @IsOptional()  
  @IsPositive()
 // @Type(()=> Number)  // Se comento debido a que enableImplicitConversion: true, se habilitó
  limit: number;

  @IsOptional()
  @IsPositive()
  //  @Type(()=> Number)    // Se comento debido a que enableImplicitConversion: true, se habilitó
  offset: number; 

}
