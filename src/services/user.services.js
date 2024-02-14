const User = require('../models/users.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const TOKEN = process.env.TOKEN_SECRET;

const getAllUserService = async () => {
  return await User.find();
};

const getUserByIdService = async (id) => {
  return await User.findById(id);
};

const getUserByDniService = async (id, dni) => {
  return await User.findByIdAndUpdate(id, dni);
};

// const loginService = async (dni, password ) => {
//   User.findOne(dni);
//   User.find(password);
// }

const createUserService = async (newUser) => {
  const createUser = new User(newUser);
  return await createUser.save();
};

const createAccessToken = async(payload) => {
  return await new Promise((resolve, reject) => {
    jwt.sign(
      payload,
      TOKEN,
    {
      expiresIn: '1d',
    },
    (error, token) => {
      if(error) reject(error)
      resolve(token)
    }
    );
  });
};

const editUserByIdService = async (id, payload, queryOptions) => {
  return await User.findByIdAndUpdate(id, payload, queryOptions);
};

const deleteUserService = async (id) => {
  return User.findByIdAndDelete(id)
};


module.exports = {
  getAllUserService,
  getUserByIdService,
  createUserService,
  editUserByIdService,
  deleteUserService,
  // loginService,
  getUserByDniService,
  createAccessToken
};