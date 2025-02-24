import express from 'express';
import { getFeaturedProducts, getNewProducts } from '../Controller/productController.js';

const customerRouter=express.Router()

customerRouter.get("/new-products",getNewProducts)
customerRouter.get("/featured-products",getFeaturedProducts)

export default customerRouter