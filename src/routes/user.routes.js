const { Router } = require("express");
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
} = require("../controllers/user.controllers");
const route = Router();
const { userRequired } = require("../middlewares/validateToken");
const validateSchema = require("../middlewares/validator.middleware");
const { registerSchema, loginSchema } = require("../schemas/user.schema");

route.get("/getAll", getAll);

route.get("/getById/:id", getById);

route.post("/login", validateSchema(loginSchema), login);

route.post("/logout", logout);

route.post("/create", validateSchema(registerSchema), create);

route.patch("/editById/:id", editById);

route.patch("/disable/:id", editById);

route.delete("/delete/:id", deleteById);

route.get("/admin", userRequired, admin);

route.get("/verifyToken", verifyToken);

module.exports = route;
