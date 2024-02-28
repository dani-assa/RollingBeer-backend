import { body } from 'express-validator';
import Product from '../models/product.model.js';
import { nameMenu, imageMenu, priceMenu, cantidadMenu, descriptionMenu } from '../helpers/productRegex.js';

const nameMenuValidation = async (nameMenu) => {
  const nameMenuExist = await productSchema.find({ nameMenu: nameMenu});

  if (nameMenuExist.length !== 0 ) {
    throw new Error(`El nombre ${nameMenu} ya esta registrado`);
  }; 

  return false;
};

const imageMenuValidation = async (imageMenu) => {
  const imageMenuExist = await productSchema.find({ imageMenu: imageMenu});

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
  const descriptionMenuExist = await productSchema.find({ descriptionMenu: descriptionMenu});

  if (descriptionMenuExist.length <= 0 ) {
    throw new Error(`La ${descriptionMenu} requerida`);
  }; 

  return false;
};

export const nameMenusValidation = {
  nameMenu: body("nameMenu")
    .isnameMenu()
    .matches(nameMenu)
    .withMessage("El nombre no es valido")
    .not()
    .isEmpty()
    .withMessage("Este campo es requerido")
    .custom(nameMenuValidation),
  
  imageMenu: body("imageMenu")
  .isimageMenu()
  .matches(imageMenu)
  .withMessage("La URL no es valida")
  .not()
  .isEmpty()
  .withMessage("Este campo es requerido")
  .custom(imageMenuValidation),

  priceMenu: body("priceMenu")
  .ispriceMenu()
  .matches(priceMenu)
  .withMessage("El precio no es valido")
  .not()
  .isEmpty()
  .withMessage("Este campo es requerido")
  .custom(priceMenuValidation),

  cantidadMenu: body("cantidadMenu")
  .iscantidadMenu()
  .matches(cantidadMenu)
  .withMessage("La cantidad no es valido")
  .not()
  .isEmpty()
  .withMessage("Este campo es requerido")
  .custom(cantidadMenuValidation),

  descriptionMenu: body("descriptionMenu")
  .isdescriptionMenu()
  .matches(descriptionMenu)
  .withMessage("La descripcion no es valida")
  .not()
  .isEmpty()
  .withMessage("Este campo es requerido")
  .custom(descriptionMenuValidation),

}

