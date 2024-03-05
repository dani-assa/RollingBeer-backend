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

router.post("/create",createProduct);
router.get("/getAll",getAll);
router.get("/getById/:id", getById);
router.get("/productsWithOptions/search",getProductsWithOptions);
router.delete("/delet/:id", verifyUserToken , validateFields ,deleteById);
router.patch("/edit/:id", edit);

export default router;