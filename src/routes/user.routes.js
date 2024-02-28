import { Router } from 'express' 
import userControllers from '../controllers/user.controllers.js';
const {
  getAll,
  getById,
  create,
  login,
  logout,
  editById,
  deleteById,
  admin,
  verifyToken,
} = userControllers;
import  userRequired  from '../validators/validateToken.js';
import  userValidations from '../validators/userValidations.js';
import validateFields from '../validators/validateFields.js';


const route = Router();

route.get("/getAll", getAll);

route.get("/getById/:id", getById);

route.post("/login", login);

route.post("/logout", logout);

route.post("/create", [userValidations.email, userValidations.password],validateFields, create);

route.patch("/editById/:id", editById);

route.patch("/disable/:id", editById);

route.delete("/delete/:id", deleteById);

route.get("/admin", userRequired, admin);

route.get("/verifyToken", verifyToken);

export default route;
