import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './guards/api-key/api-key.guard';
import { ConfigModule } from '@nestjs/config';
import { log } from 'console';
import { LoggingsMiddleware } from './middleware/loggings/loggings.middleware';

@Module
({ 
    imports: [ConfigModule], 
    providers: [{ provide: APP_GUARD, useClass: ApiKeyGuard}]  //ApiKeyGuard is the class use for GUARD
    //APP_GUARD is a built-in dependency injection token used to apply guards globally across an application.
})
export class CommonModule implements NestModule {

 configure(consumer: MiddlewareConsumer) {
     consumer.apply(LoggingsMiddleware).forRoutes('*');
   //consumer.apply(LoggingsMiddleware).forRoutes({path: 'coffees', method: RequestMethod.GET })
   //consumer.apply(LoggingsMiddleware).exclude('coffees').forRoutes('*')
 // consumer.apply(LoggingsMiddleware).forRoutes('*')
}
}
