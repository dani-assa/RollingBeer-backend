import { Schema, model } from 'mongoose';
import { nameMenu, imageMenu, priceMenu, cantidadMenu, descriptionMenu } from '../helpers/productRegex.js';

const productSchema = new Schema({
  nameMenu: {
    type: String,
    required: [true,"Debe ingresar un nombre"],
    minLength: [4,"El nombre es demasiado corto"],
    maxLength: [60, "El nombre es demasiado largo"],
    match: [nameMenu, "El nombre ingresado es invalido"],
    unique: [true, "Un producto con este nombre ya existe"],
  },
  categoryMenu:{
    type : String,
    required : [true, "Debe ingresar una categoria"],
    enum : {values: ["Hamburguesa","Sandwich","Para Picar","Bebidas","Wrap"], 
    message: "{VALUE} no es una categoria valida"},
  },
  imageMenu: {
    type: String,
    required: [true, "Debe ingresar una imagen"],
    match: [imageMenu, "La imagen ingresada es invalida"],
  },
  priceMenu: {
    type: Number,
    required: [true, "Debe ingresar un precio"],
    min: [1, "{VALUE} es un valor invalido"],
    max: [10_000_000, "{VALUE} es un valor invalido"],
    match: [priceMenu, "El precio {VALUE} ingresado es invalido"],
  },
  cantidadMenu: {
    type: String,
    required: [true, "Debe ingresar una cantidad"],
    match: [cantidadMenu, "La cantidad {VALUE} ingresada es invalida"],
  },
  descriptionMenu: {
    type: String,
    required: [true, "Debe ingresar una descripcion"],
    match: [descriptionMenu, "La description ingresada es invalida"],
  },
  visible: {
    type: Boolean,
    default: true,
  },
},{
  timestamps: true
});

export default model("Product", productSchema);