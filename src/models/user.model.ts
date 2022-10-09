import { Schema, model, Document } from 'mongoose';

export interface User {
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  salt?: string;
  registered?: boolean;
  activated?: boolean;
  emailConfirmed?: boolean;
}

const userSchema = new Schema<User>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  salt: { type: String, required: true },
  registered: { type: Boolean },
  activated: { type: Boolean },
  emailConfirmed: { type: Boolean },
});

export default model<User & Document>('User', userSchema);
