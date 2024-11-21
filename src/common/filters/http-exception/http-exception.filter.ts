import { ArgumentsHost, Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter<T extends HttpException> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) 
  {
    const ctx = host.switchToHttp();    // context 
    const response= ctx.getResponse<Response>();

    const status = exception.getStatus();
    const exceptionResponse = exception.getResponse();
    const error =  typeof response === 'string' ? { message: exceptionResponse } : (exceptionResponse as object);
   /* const error =typeof response === 'string';
     if (error){
      message: exceptionResponse
     }
     else{
      console.log('entre por otro error');
      exceptionResponse as object;
     }*/

    response.status(status).json  
    (
      {
      ...error,  //se retorna la respuesta (message: ; error; statusCode; timestamp)
      timestamp: new Date().toISOString(),
       }
     );    
  }
}
