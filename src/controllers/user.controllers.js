import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from 'bcryptjs'
const TOKEN_SECRET = process.env.TOKEN_SECRET;
import { hashPassword } from "../helpers/hashPassword.js";
import { signToken } from "../helpers/signToken.js";

import {
  getAllUserService,
  getUserByIdService,
  createAccessToken,
} from "../services/user.services.js";

const getAll = async (req, res) => {
  try {
    // const response = await getAllUserService();
    const response = await User.find();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    // const response = await getUserByIdService(_id);
    const response = await User.findById(id);
    if (!response) return res.status(404).json("Usuario no existente.");
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error.message);
    console.log(error.message);
  }
};

const create = async (req, res) => {
  try {
    const { name, lastName, email, dni, userName, password } = req.body;

    const userFound = await User.findOne({ email });
    if (userFound)
      return res
        .status(400)
        .json(["Ya existe un usuario registrado con ese email"]);

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      lastName,
      email,
      userName,
      dni,
      password: passwordHash,
    });
    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });
    res.cookie("token", token);
    res.status(201).json({
      id: userSaved._id,
      name: userSaved.name,
      userName: userSaved.userName,
      dni: userSaved.dni,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
      role: userSaved.role,
    });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

// const create = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const newUser = User({
//       email: email,
//       password: password,
//     });

//     const hashedPassword = await hashPassword(password);
//     newUser.password = hashedPassword;
//     newUser.save();
//     const authCredentials = signToken(newUser);
//     res.status(201).json(authCredentials);
//   } catch (error) {
//     res.status(500).json(error);
//   }
// };


const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userFound = await User.findOne({ email });
    if (!userFound) return res.status(400).json(["Usuario no existente."]);
    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch)
      return res.status(400).json(["Usuario y/o contraseña incorrectos."]);

    const token = await createAccessToken({ id: userFound._id });
    res.cookie("token", token);
    res.status(201).json({
      id: userFound._id,
      name: userFound.name,
      userName: userFound.userName,
      email: userFound.email,
      role: userFound.role,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json(error.message);
    
  }
};

// const login = async (req, res) => {
//   const { email, password } = req.body;

//   const user = await User.findOne({ email: email });
//   const authCredentials = signToken(user);


//   res.status(200).json(authCredentials);
// };

const logout = (req, res) => {
  try {
    res.cookie("token", "", {
      expires: new Date(0),
    });
    return res.sendStatus(200);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const editById = async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    // const queryOptions = {
    //   returnDocument: "after",
    // };
    // const response = await editUserByIdService(id, payload, queryOptions);
    const userUpdated = await User.findByIdAndUpdate(id, payload, {
      new: true,
      runValidators: true,
    });
    if (!userUpdated) return res.status(404).json("Usuario no existente");
    res.status(200).json({ message: "Usuario editado con exito", userUpdated });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const deleteById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await deleteUserService(id);
    if (!response) return res.status(404).json("Usuario no existente");
    res.status(204).json();
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const admin = async (req, res) => {
  const userFound = await User.findById(req.user.id);
  if (!userFound) return res.status(400).json("Usuario no existente");
  return res.json({
    id: userFound._id,
    userName: userFound.userName,
    email: userFound.email,
    createdAt: userFound.createdAt,
    updatedAt: userFound.updatedAt,
  });
};

const verifyToken = async (req, res) => {
  try {
    const { token } = req.cookies;
    if (!token) return res.status(401).json({ message: "No autorizado" });
    jwt.verify(token, TOKEN_SECRET, async (error, user) => {
      if (error) return res.status(401).json({ message: "No autorizado" });

      const userFound = await User.findById(user.id);
      if (!userFound) return res.status(401).json({ message: "No autorizado" });

      return res.json({
        id: userFound._id,
        name: userFound.name,
        userName: userFound.userName,
        email: userFound.email,
        role: userFound.role,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

export default {
  getAll,
  getById,
  create,
  login,
  logout,
  editById,
  deleteById,
  admin,
  verifyToken,
};
