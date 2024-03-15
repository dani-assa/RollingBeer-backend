import { body } from "express-validator";
import User from '../models/user.model.js';
import passRegex from '../helpers/passwordRegex.js';


const userNameValidations = body('userName').custom(async (value) => {
  const userNameExist = await Product.findOne({ userName: value });
  if (userNameExist) {
    throw new Error(`El usuario ${value} ya está registrado`);
  }
  return true;
}); 

const dniValidations = body('dni').custom(async (value) => {
  const dniExist = await Product.findOne({ dni: value });
  if (dniExist) {
    throw new Error(`El dni ${value} ya está registrado`);
  }
  return true;
}); 

const emailValidations = body('email').custom(async (value) => {
  const emailExist = await Product.findOne({ email: value });
  if (emailExist) {
    throw new Error(`El email ${value} ya está registrado`);
  }
  return true;
}); 


const userValidations = {
  email: body('email')
    .notEmpty()
    .withMessage('El email no es valido')
    .custom(emailValidations),
  password: body('password')
    .notEmpty()
    .matches(passRegex)
    .withMessage('La contraseña no es valida'),
  username: body('userName')
    .notEmpty()
    .withMessage('El usuario no es valido')
    .custom(userNameValidations),
  dni: body('dni')
    .notEmpty()
    .custom(dniValidations)
    .withMessage('El dni no es valido')
};


export default userValidations;