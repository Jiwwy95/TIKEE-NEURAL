import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class UserModel {
  @Prop({ required: true, unique: true })
  email!: string;

  @Prop({ required: true })
  password!: string;

  @Prop({ required: true })
  name!: string;

  @Prop({ type: [String], default: [] }) // <-- ASEGÚRATE DE QUE ESTO EXISTA
  roles!: string[];

  @Prop({ 
    type: String, 
    enum: ['admin', 'analista', 'lector'], 
    default: 'lector' 
  })
  role!: string;

  @Prop({ type: [String], default: [] })
  activeModules!: string[];
}


export type UserDocument = UserModel & Document;
export const UserSchema = SchemaFactory.createForClass(UserModel);
