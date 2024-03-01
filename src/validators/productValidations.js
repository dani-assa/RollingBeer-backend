import { body } from 'express-validator';
import Product from '../models/product.model.js';
import { nameRegex, imageRegex, priceRegex, cantidadRegex, descriptionRegex } from '../helpers/productRegex.js';

const nameValidation = body('name').custom(async (value) => {
  if (!nameRegex.test(value)) {
    throw new Error('El nombre ingresado es inválido');
  }

  const nameExist = await Product.findOne({ name: value });
  if (nameExist) {
    throw new Error(`El nombre ${value} ya está registrado`);
  }

  return true;
});

const imageValidation = body('image').custom(async (value) => {
  if (!imageRegex.test(value)) {
    throw new Error('La imagen ingresada es inválida');
  }

  const imageExist = await Product.findOne({ image: value });
  if (imageExist) {
    throw new Error(`La imagen ${value} ya está registrada`);
  }

  return true;
});

const priceValidation = body('price').custom((value) => {
  if (!priceRegex.test(value.toString())) {
    throw new Error('El precio ingresado es inválido');
  }

  return true;
});

const cantidadValidation = body('cantidad').custom((value) => {
  if (!cantidadRegex.test(value.toString())) {
    throw new Error('La cantidad ingresada es inválida');
  }

  return true;
});
const descriptionValidation = body('description').custom(async (value) => {
  if (!descriptionRegex.test(value)) {
    throw new Error('La descripción ingresada es inválida');
  }

  return true;
});

const categoryValidation = body('category').custom((value) => {
  const validCategories = ["Hamburguesa", "Sandwich", "Para Picar", "Bebidas", "Wrap"];
  if (!validCategories.includes(value)) {
    throw new Error(`${value} no es una categoría válida`);
  }

  return true;
});


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


