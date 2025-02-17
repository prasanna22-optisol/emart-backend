import express from "express";
import {addCategory, deleteCategory, updateCategory} from "../Controller/categoryController.js";
import category from "../Schema/category.js";


const categoryRouter=express.Router()

categoryRouter.post("/add",addCategory)
categoryRouter.put("/update/:id",updateCategory)
categoryRouter.delete("/delete/:id",deleteCategory)




export default categoryRouter