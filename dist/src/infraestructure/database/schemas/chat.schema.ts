import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ChatDocument = ChatModel & Document;

@Schema({ _id: false }) // desactivamos el _id por defecto para definirlo manualmente con UUID
export class ChatModel {
  @Prop({ type: String, required: true }) // este sera el _id real en Mongo (usando UUID)
  _id!: string;

  @Prop({ required: true }) // util si usas 'id' en tu entidad ademas del '_id'
  id!: string;

  @Prop({ required: true })
  userId!: string;

  @Prop()
  module?: string;

  @Prop({ default: Date.now })
  createdAt!: Date;

  @Prop({
    type: [
      {
        question: { type: String, required: true },
        answer: { type: String, required: true },
        timestamp: { type: Date, required: true },
      },
    ],
    default: [],
  })
  messages!: {
    question: string;
    answer: string;
    timestamp: Date;
  }[];
}

export const ChatSchema = SchemaFactory.createForClass(ChatModel);
