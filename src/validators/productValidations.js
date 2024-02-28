import { body } from 'express-validator';
import Product from '../models/product.model.js';
import { nameMenu, imageMenu, priceMenu, cantidadMenu, descriptionMenu } from '../helpers/productRegex.js';

const nameMenuValidation = async (nameMenu) => {
  const nameMenuExist = await productSchema.findOne({ nameMenu: nameMenu});

  if (nameMenuExist.length !== 0 ) {
    throw new Error(`El nombre ${nameMenu} ya esta registrado`);
  }; 

  return false;
};

const imageMenuValidation = async (imageMenu) => {
  const imageMenuExist = await productSchema.findOne({ imageMenu: imageMenu});

  if (imageMenuExist.length !== 0 ) {
    throw new Error(`La ${imageMenu} ya esta registrada`);
  }; 

  return false;
};

const priceMenuValidation = async (priceMenu) => {
  const priceMenuExist = await productSchema.find({ priceMenu: priceMenu});

  if (priceMenuExist.length <= 0 ) {
    throw new Error(`El ${priceMenu} no puede ser negativo`);
  }; 

  return false;
};

const cantidadMenuValidation = async (cantidadMenu) => {
  const cantidadMenuExist = await productSchema.find({ cantidadMenu: cantidadMenu});

  if (cantidadMenuExist.length <= 0 ) {
    throw new Error(`La ${cantidadMenu} no puede ser negativa`);
  }; 

  return false;
};

const descriptionMenuValidation = async (descriptionMenu) => {
  const descriptionMenuExist = await productSchema.findOne({ descriptionMenu: descriptionMenu});

  if (descriptionMenuExist.length <= 0 ) {
    throw new Error(`La ${descriptionMenu} requerida`);
  }; 

  return false;
};

const categoryMenuValidation = async (categoryMenu) => {
  const categoryMenuExist = await productSchema.findOne({ categoryMenu: categoryMenu});

  if (categoryMenuExist.length <= 0 ) {
    throw new Error(`La ${categoryMenu} es requerida`);
  }; 

  return false;
};


export const nameMenusValidation = {
  nameMenu: body("nameMenu")
    .notEmpty()
    .withMessage("El nombre no puede estar vacío")
    .custom(nameMenuValidation),
  
  imageMenu: body("imageMenu")
    .notEmpty()
    .withMessage("La URL de la imagen no puede estar vacía")
    .custom(imageMenuValidation),

  categoryMenu: body("categoryMenu")
    .notEmpty()
    .withMessage("La categoria no puede estar vacia")
    .custom(categoryMenuValidation),

  priceMenu: body("priceMenu")
    .notEmpty()
    .withMessage("El precio no puede estar vacío")
    .custom(priceMenuValidation),

  cantidadMenu: body("cantidadMenu")
    .notEmpty()
    .withMessage("La cantidad no puede estar vacía")
    .custom(cantidadMenuValidation),

  descriptionMenu: body("descriptionMenu")
    .notEmpty()
    .withMessage("La descripción no puede estar vacía")
    .custom(descriptionMenuValidation),
}


