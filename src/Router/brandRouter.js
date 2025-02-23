import express from "express";
import {createBrand, deleteBrand, getBrandById, getBrands, updateBrand} from "../Controller/brandController.js";

const brandRouter=express.Router()

brandRouter.post("/add",createBrand)
brandRouter.get("/all",getBrands)
brandRouter.get("/:id",getBrandById)
brandRouter.put("/update/:id",updateBrand)
brandRouter.delete("/delete/:id",deleteBrand)

export default brandRouter