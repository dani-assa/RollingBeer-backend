const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'El campo nombre es requerido'],
      trim: true
    },
    userName: {
      type: String,
      required: [true, 'El nombre de usuario es requerido'],
      trim: true,
      unique: true
    },
    email: {
      type: String,
      required: [true, 'El email es requerido'],
      trim: true,
      unique: true
    },
    
    password: {
      type: String,
      required: [true, 'La contraseña es requerida']
    },
    role: {
      type: String,
      enum: ['admin', 'client'],
      default: 'client'
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
    {timestamps: true}
    );


  module.exports = model('user', userSchema);