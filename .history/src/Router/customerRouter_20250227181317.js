import express from 'express';
import { getFeaturedProducts, getNewProducts, getProductById, getProductsListing } from '../Controller/productController.js';
import { getAllCategories } from '../Controller/categoryController.js';
import { getBrands } from '../Controller/brandController.js';
import { addToWishList, getWishList, removeFromWishList } from '../Controller/wishlistController.js';

const customerRouter=express.Router()

customerRouter.get("/new-products",getNewProducts)
customerRouter.get("/featured-products",getFeaturedProducts)
customerRouter.get("/all-categories",getAllCategories)
customerRouter.get("/product-list",getProductsListing)
customerRouter.get("/all-brands",getBrands)
customerRouter.get("/single-product/:id",getProductById)
customerRouter.get("/wishlists",getWishList)
customerRouter.post("/add-to-wishlist",addToWishList)
customerRouter.get("/wishlists",getWishList)
customerRouter.delete("/remove-from-wishlist/:id",removeFromWishList)

export default customerRouter