import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';

export type TicketDocument = Ticket & Document;

@Schema()
export class Ticket extends Document {
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ required: true })
  creator_id: string;

  @Prop()
  number: number;

  @Prop({ required: [true, 'Title can not be empty'] })
  title: string;

  @Prop()
  description: string;

  @Prop({
    type: String,
    enum: ['Low', 'Normal', 'High'],
    default: 'Normal',
  })
  priority: string;

  @Prop({
    type: String,
    enum: ['Wishlist', 'Minor', 'Normal', 'Important', 'Critical'],
    default: 'Normal',
  })
  severity: string;

  @Prop({
    type: String,
    enum: ['Open', 'Closed'],
    default: 'Open',
  })
  status: string;

  @Prop({ type: Date, required: true, default: Date.now })
  modified: Date;
}

export const TicketsSchema = SchemaFactory.createForClass(Ticket);
