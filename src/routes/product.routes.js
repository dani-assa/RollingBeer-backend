import { Router } from "express";
import {
        createProduct, 
        getAll, 
        getById, 
        deleteById,
        getProductsWithOptions,
        edit
        } from "../controllers/product.controllers.js";

const router = Router();

router.post("/product", createProduct);
router.get("/products", getAll);
router.get("/product/:id", getById);
router.get("/products/search",getProductsWithOptions);
router.delete("/product/:id", deleteById);
router.patch("/product/:id", edit);

export default router;