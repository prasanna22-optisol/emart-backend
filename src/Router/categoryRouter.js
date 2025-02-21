import express from "express";
import {addCategory, deleteCategory, getAllCategories, getCategoryById, updateCategory} from "../Controller/categoryController.js";
import category from "../Schema/category.js";


const categoryRouter=express.Router()

categoryRouter.post("/add",addCategory)
categoryRouter.put("/update/:id",updateCategory)
categoryRouter.get("/all",getAllCategories)
categoryRouter.get("/:id",getCategoryById)
categoryRouter.delete("/delete/:id",deleteCategory)




export default categoryRouter