import mongoose from 'mongoose';
import crypto from 'crypto';

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: 'User Name is required'
  },
  email: {
    type: String,
    trim: true,
    unique: 'Email already Exists'
  }
});
