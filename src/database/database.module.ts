import { DynamicModule, Module } from '@nestjs/common';
import { DataSource, DataSourceOptions } from 'typeorm';

@Module({})  
   /*{ /*static implementation
      providers: [
    {
       provide: 'CONNECTION',
       useValue: new DataSource(
        {
            type: 'postgres',
            host: 'localhost',
            port: 5432,
        }).initialize(),
    },
  ],
}
)*/
export class DatabaseModule {
static register(options: DataSourceOptions): DynamicModule{    //DynamicModule enable to use DYNAMIC MODULES instead static Modules
    return{
         module: DatabaseModule,
         providers: [
            {
                provide: 'CONNECTION',
                useValue: new DataSource(options).initialize(),
            }
         ]
    }
}


}
