import express from 'express';
import { getFeaturedProducts, getNewProducts, getProductById, getProductsListing } from '../Controller/productController.js';
import { getAllCategories } from '../Controller/categoryController.js';
import { getBrands } from '../Controller/brandController.js';
import { addToWishList, getWishList, removeFromWishList } from '../Controller/wishlistController.js';
import { removeFromCart } from './cartController.js';

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


customerRouter.get("/carts/all",async(req,res)=>{
    console.log(req.user)
    const userId=req.user.id
    const items=await getCart(userId)
    res.status(200).json({
        statusCode:200,
        message:"Cart fetched successfully",
        data:items
    })
})


customerRouter.post("/carts/add/:productId",async(req,res)=>{
    console.log(req.user)
    const userId=req.user.id
    const productId=req.params.productId
    const quantity=req.body.quantity
    const cartItems=await addToCart(userId,productId,quantity)
    res.status(200).json({
        statusCode:200,
        message:"Product added to cart successfully",
        data:cartItems
    })
})

customerRouter.delete("/carts/remove/:productId",async(req,res)=>{
    console.log(req.user);
  const userId = req.user.id;
  const productId = req.params.productId;
  const items = await removeFromCart(userId, productId);
  
})

export default customerRouter