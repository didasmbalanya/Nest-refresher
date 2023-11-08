import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Scent extends Document {
  @Prop()
  name: string;

  @Prop({ isRequired: false })
  description: string;

  @Prop()
  brand: string;

  @Prop({ default: 0 })
  recommendations: number;

  @Prop([String])
  flavors: string[];
}

export const ScentSchema = SchemaFactory.createForClass(Scent);
