import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';

@Schema()
export class Event extends mongoose.Document {
  @Prop()
  type: string;

  @Prop()
  name: string;

  @Prop(mongoose.SchemaTypes.Mixed)
  payload: Record<string, any>;
}

export const EventSchema = SchemaFactory.createForClass(Event);
EventSchema.index({ name: 1, type: -1 });

/**
 * In this example:
 * We passed a value of 1 (to name) which specifies that the index
 * should order these items in an Ascending order.
 *
 * We passed type a value of (negative) -1 which specifies that
 * The index should order these items in Descending order.
 */
