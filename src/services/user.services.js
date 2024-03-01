import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const TOKEN = process.env.TOKEN_SECRET;

export const getAllUserService = async () => {
  return await find();
};

export const getUserByIdService = async (id) => {
  return await findById(id);
};

export const createUserService = async (newUser) => {
  const createUser = new User(newUser);
  return await createUser.save();
};

export const createAccessToken = async (payload) => {
  return await new Promise((resolve, reject) => {
    jwt.sign(
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

export const editUserByIdService = async (id, payload, queryOptions) => {
  return await findByIdAndUpdate(id, payload, queryOptions);
};

export const deleteUserService = async (id) => {
  return findByIdAndDelete(id);
};
