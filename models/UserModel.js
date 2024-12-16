import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
  address: {
    type: String,
    unique: true,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  signature: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
})

const User = model('User', UserSchema);
export default User;