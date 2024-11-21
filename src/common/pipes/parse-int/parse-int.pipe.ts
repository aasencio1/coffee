import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata) 
  {
    console.error("entre .... ");
   const val= parseInt (value, 10);
    if (isNaN(val))   //NaN Not a Number
      {
        console.error("EN EL IF ");
        throw new BadRequestException (
          `Validation Failed.  ${val} is not an integer`
        );
      }
      console.error("sali .... ");
    return val;
  }
}
