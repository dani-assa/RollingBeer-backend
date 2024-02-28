import { Router } from "express";
import {
        createProduct, 
        getAll, 
        getById, 
        deleteById,
        getProductsWithOptions,
        edit
        } from "../controllers/product.controllers.js";
import { verifyUserToken } from "../models/verifyToken.js";
import  validateFields  from "../validators/validateFields.js";

const router = Router();

router.post("/product", createProduct);
router.get("/products", getAll);
router.get("/product/:id", getById);
router.get("/products/search",getProductsWithOptions);
router.delete("/product/:id", verifyUserToken , validateFields ,deleteById);
router.patch("/product/:id", edit);

export default router;