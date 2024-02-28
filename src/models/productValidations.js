import { req } from "express-validator";

const checkRole = (token) => {
  
};

export const tokenRoleValidation = {
  token: req
  .custom(checkRole)
};