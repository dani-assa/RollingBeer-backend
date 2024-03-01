import Product from "../models/product.model.js"
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
export const TOKEN = process.env.TOKEN_SECRET;

export const getAllProductservices = async () =>{

    return await find();
}

export const createProductService = async (newProduct) => {

    const createProduct = new Product(newProduct);
    return await createProduct.save();
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

export const editProductByIdService = async (id, payload, queryOptions) => {
    return await findByIdAndUpdate(id, payload, queryOptions);
};
  
export const deleteProductService = async (id) => {
    return findByIdAndDelete(id);
};