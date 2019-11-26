'use strict';
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  user_name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  first_name: {
    type: String
  },
  last_name: {
    type: String
  },
  birthday: {
    type: String
  },
  gender: {
    type: String,
    enum: ['male', 'female', 'other']
  },
  marital_status: {
    type: String
  },
  address: {
    type: String
  },
  mobile: {
    type: String
  },
  avatar: {
    type: String
  },
  status: {
    type: String,
    enum: ['active', 'deactive'],
    default: 'active'
  },
  created_date: {
    type: Date,
    default: Date.now
  },
  created_by: {
    type: String
  },
  updated_date: {
    type: Date,
    default: Date.now
  },
  updated_by: {
    type: String
  },
  tokens: [{
      token: {
          type: String,
          required: true
      }
  }]
});

module.exports = mongoose.model('User', UserSchema);