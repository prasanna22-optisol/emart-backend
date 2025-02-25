import express from 'express';
import { getFeaturedProducts, getNewProducts } from '../Controller/productController.js';
import { getAllCategories } from '../Controller/categoryController.js';

const customerRouter=express.Router()

customerRouter.get("/new-products",getNewProducts)
customerRouter.get("/featured-products",getFeaturedProducts)
customerRouter.get("/all-categories",getAllCategories)

export default customerRouter