import { body } from "express-validator";
import User from "../models/user.model.js";
import passRegex from "../helpers/passwordRegex.js";

const emailExistsValidation = async (email) => {
  const emailExists = await User.find({ email: email });

  if (emailExists.length !== 0) {
    throw new Error(`El email ${email} ya esta registrado`);
  }
  return false;
};

const checkPasswordValidation = async (req) => {
  const { email, password } = req;

  const userFound = await User.findOne({ email: email });

  if (!userFound) {
    throw new Error(`El email o la contraseña son incorrectos`);
  }

  const checkPassword = await comparePasswords(password, userFound.password);

  if (!checkPassword) {
    throw new Error(`El email o la contraseña son incorrectos`);
  }

  return false;
};

const userValidations = {
  email: body("email")
    .isEmail()
    .withMessage("El email no es valido")
    .not()
    .isEmpty()
    .withMessage("Este campo es requerido")
    .custom(emailExistsValidation),
  password: body("password")
    .matches(passRegex)
    .withMessage("La contraseña no es valida"),
};

const loginValidations = {
  email: body("email")
    .isEmail()
    .withMessage("El email no es valido")
    .not()
    .isEmpty()
    .withMessage("Este campo es requerido")
    ,
  password: body().custom(checkPasswordValidation),
};

export default (userValidations, loginValidations);
