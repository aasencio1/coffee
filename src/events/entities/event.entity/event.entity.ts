import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";


@Schema()
export class Event extends mongoose.Document {
    @Prop()
    type: string;

    @Prop()
    name: string;

    @Prop({ default: 0 })
    payload: Record<string, any>;
    
}

export const EventSchema = SchemaFactory.createForClass(Event)