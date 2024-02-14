const User = require("../models/users.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const TOKEN_SECRET = process.env.TOKEN_SECRET;

const {
  getAllUserService,
  getUserByIdService,
  createAccessToken,
} = require("../services/user.services");

const getAll = async (req, res) => {
  try {
    const response = await getAllUserService();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const response = await getUserByIdService(id);
    if (!response) return res.status(404).json("Usuario no existente.");
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const create = async (req, res) => {
  try {
    const {
      name,
      userName,
      email,
      password,
      // passwordCheck
    } = req.body;

    const userFound = await User.findOne({ email });
    if (userFound)
      return res
        .status(400)
        .json(["Ya existe un usuario registrado con ese email"]);

    const passwordHash = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      userName,
      email,
      password: passwordHash,
      // passwordCheck: passwordHash
    });

    const userSaved = await newUser.save();
    const token = await createAccessToken({ id: userSaved._id });
    res.cookie("token", token);
    res.status(201).json({
      id: userSaved._id,
      name: userSaved.name,
      userName: userSaved.userName,
      email: userSaved.email,
      createdAt: userSaved.createdAt,
      updatedAt: userSaved.updatedAt,
      role: userSaved.role,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const login = async (req, res) => {
  try {
    const { dni, password } = req.body;
    const userFound = await User.findOne({ dni });
    if (!userFound) return res.status(400).json(["Usuario no existente."]);
    const isMatch = await bcrypt.compare(password, userFound.password);
    if (!isMatch)
      return res.status(400).json(["Usuario y/o contraseña incorrectos."]);

    const token = await createAccessToken({ id: userFound._id });
    res.cookie("token", token);
    res.status(201).json({
      id: userFound._id,
      name: userFound.name,
      dni: userFound.dni,
      email: userFound.email,
      role: userFound.role,
      createdAt: userFound.createdAt,
      updatedAt: userFound.updatedAt,
    });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

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
        dni: userFound.dni,
        email: userFound.email,
        role: userFound.role,
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error.message);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  login,
  logout,
  verifyToken,
};
