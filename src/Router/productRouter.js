import express from "express";
import {
    addProduct,
    deleteProduct,
    getAllProducts,
    getProductById,
    updateProduct
} from "../Controller/productController.js";


const productRouter=express.Router()


productRouter.post("/add",addProduct)
productRouter.put("/update/:id",updateProduct)
productRouter.get("/all",getAllProducts)
productRouter.get("/:id",getProductById)
productRouter.delete("/delete/:id",deleteProduct)


export default productRouter