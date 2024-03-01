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

router.post("/",createProduct);
router.get("/",getAll);
router.get("/:id", getById);
router.get("/search",getProductsWithOptions);
router.delete("/:id", verifyUserToken , validateFields ,deleteById);
router.patch("/:id", edit);

export default router;