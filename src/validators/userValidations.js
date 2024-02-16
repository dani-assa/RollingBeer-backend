const { body } = require("express-validator");
const User = require("../models/user.model");
const passRegex = require('../helpers/passwordRegex')

const userValidations = {
  email: body("email")
  .isEmail()
  .withMessage('El email no es valido')
  .not()
  .isEmpty()
  .withMessage('Este campo es requerido')
  ,
  password: body('password')
  .matches(passRegex)
  .withMessage('La contraseña no es valida')
};

module.exports = userValidations;
