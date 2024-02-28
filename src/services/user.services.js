import   { User, find, findById, findByIdAndUpdate, findByIdAndDelete } from "../models/user.model";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
const TOKEN = process.env.TOKEN_SECRET;

const getAllUserService = async () => {
  return await find();
};

const getUserByIdService = async (id) => {
  return await findById(id);
};

const createUserService = async (newUser) => {
  const createUser = new User(newUser);
  return await createUser.save();
};

const createAccessToken = async (payload) => {
  return await new Promise((resolve, reject) => {
    sign(
      payload,
      TOKEN,
      {
        expiresIn: "1d",
      },
      (error, token) => {
        if (error) reject(error);
        resolve(token);
      }
    );
  });
};

const editUserByIdService = async (id, payload, queryOptions) => {
  return await findByIdAndUpdate(id, payload, queryOptions);
};

const deleteUserService = async (id) => {
  return findByIdAndDelete(id);
};

export default {
  getAllUserService,
  getUserByIdService,
  createUserService,
  editUserByIdService,
  deleteUserService,
  createAccessToken,
};
