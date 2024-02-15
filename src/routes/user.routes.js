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


route.get("/getAll", getAll);

route.get("/getById/:id", getById);

route.post("/login", login);

route.post("/logout", logout);

route.post("/create", create);

route.patch("/editById/:id", editById);

route.patch("/disable/:id", editById);

route.delete("/delete/:id", deleteById);

route.get("/admin", userRequired, admin);

route.get("/verifyToken", verifyToken);

module.exports = route;
