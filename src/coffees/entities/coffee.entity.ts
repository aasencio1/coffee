import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Schema } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Coffee extends Document{
    // id: number; Se elimina debido a que Mongodb gestiona los Documentos
    @Prop()
    name: string;

     @Prop()
    brand: string;

    @Prop({ default: 0})
    recommendations: number;

     
     @Prop([String])
    flavors: string[];
}
export const CoffeeSchema = SchemaFactory.createForClass(Coffee);