import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

const SALT_ROUNDS = 10;

@Schema()
export class User extends Document {
  _id: MongooseSchema.Types.ObjectId;

  @Prop({ required: [true, 'Username can not be empty'] })
  username: string;

  @Prop({
    required: [true, 'Password can not be empty'],
    minlength: [8, 'Password should include at least 8 chars'],
  })
  password: string;

  @Prop({ type: String, enum: ['user', 'admin'], default: 'user' })
  role: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, SALT_ROUNDS);
  next();
});
