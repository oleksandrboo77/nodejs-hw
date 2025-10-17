import mongoose from 'mongoose';
const { Schema, model } = mongoose;

export const userSchema = new Schema(
  {
    username: {
      type: String,
      trim: true,
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
      },
      password: {
        type: String,
        required: true,
      },
    },
  },
  {
    timestamps: true,
  },
);

export const User = model('User', userSchema);
