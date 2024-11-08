import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { ApiKeyGuard } from './guards/api-key/api-key.guard';
import { ConfigModule } from '@nestjs/config';

@Module
({ 
    imports: [ConfigModule], 
    providers: [{ provide: APP_GUARD, useClass: ApiKeyGuard}]  //ApiKeyGuard is the class use for GUARD
    //APP_GUARD is a built-in dependency injection token used to apply guards globally across an application.
})
export class CommonModule {}
