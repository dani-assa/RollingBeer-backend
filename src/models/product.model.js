import { Schema, model } from 'mongoose';
import { nameMenu, imageMenu, priceMenu, cantidadMenu, descriptionMenu } from '../helpers/productRegex.js';

const productSchema = new Schema({
  nameMenu: {
    type: String,
    required: [true,"Debe ingresar un nombre"],
    minLength: [4,"El nombre es demasiado corto"],
    maxLength: [60, "El nombre es demasiado largo"],
    unique: [true, "Un producto con este nombre ya existe"],
  },
  priceMenu: {
    type: Number,
    required: [true, "Debe ingresar un precio"],
    min: [1, "{VALUE} es un valor invalido"],
    max: [10_000_000, "{VALUE} es un valor invalido"],
  },
  canntidadMenu: {
    type: String,
    required: [true, "Debe ingresar una cantidad"],
  },
  descriptionMenu: {
    type: String,
    required: [true, "Debe ingresar una descripcion"],
  },
  visible: {
    type: Boolean,
    default: true,
  },
  imageMenu: {
    type: String,
    required: [true, "Debe ingresar una imagen"],
    match: [imageRegex, "La imagen ingresada es invalida"],
  },
},{
  timestamps: true
});

export default model("Product", productSchema);