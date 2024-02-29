import { body } from 'express-validator';
import Product from '../models/product.model.js';
import { nameRegex, imageRegex, priceRegex, cantidadRegex, descriptionRegex } from '../helpers/productRegex.js';

const nameValidation = async (nameRegex) => {
  const nameExist = await productSchema.findOne({ nameRegex: nameRegex});

  if (nameExist.length !== 0 ) {
    throw new Error(`El nombre ${nameRegex} ya esta registrado`);
  }; 

  return false;
};

const imageValidation = async (imageRegex) => {
  const imageExist = await productSchema.findOne({ imageRegex: imageRegex});

  if (imageExist.length !== 0 ) {
    throw new Error(`La ${imageRegex} ya esta registrada`);
  }; 

  return false;
};

const priceValidation = async (priceRegex) => {
  const priceExist = await productSchema.find({ priceRegex: priceRegex});

  if (priceExist.length <= 0 ) {
    throw new Error(`El ${priceRegex} no puede ser negativo`);
  }; 

  return false;
};

const cantidadValidation = async (cantidadRegex) => {
  const cantidadExist = await productSchema.find({ cantidadRegex: cantidadRegex});

  if (cantidadExist.length <= 0 ) {
    throw new Error(`La ${cantidadRegex} no puede ser negativa`);
  }; 

  return false;
};

const descriptionValidation = async (descriptionRegex) => {
  const descriptionExist = await productSchema.findOne({ descriptionRegex: descriptionRegex});

  if (descriptionExist.length <= 0 ) {
    throw new Error(`La ${descriptionRegex} requerida`);
  }; 

  return false;
};

const categoryValidation = async (categoryRegex) => {
  const categoryExist = await productSchema.findOne({ categoryRegex: categoryRegex});

  if (categoryExist.length <= 0 ) {
    throw new Error(`La ${categoryRegex} es requerida`);
  }; 

  return false;
};


export const MenuValidation = {
  name: body("name")
    .notEmpty()
    .withMessage("El nombre no puede estar vacío")
    .custom(nameValidation),
  
  image: body("image")
    .notEmpty()
    .withMessage("La URL de la imagen no puede estar vacía")
    .custom(imageValidation),

  category: body("category")
    .notEmpty()
    .withMessage("La categoria no puede estar vacia")
    .custom(categoryValidation),

  price: body("price")
    .notEmpty()
    .withMessage("El precio no puede estar vacío")
    .custom(priceValidation),

  cantidad: body("cantidad")
    .notEmpty()
    .withMessage("La cantidad no puede estar vacía")
    .custom(cantidadValidation),

  description: body("description")
    .notEmpty()
    .withMessage("La descripción no puede estar vacía")
    .custom(descriptionValidation),
}


