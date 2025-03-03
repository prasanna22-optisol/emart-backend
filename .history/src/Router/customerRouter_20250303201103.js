import express from 'express';
import { getFeaturedProducts, getNewProducts, getProductById, getProductsListing } from '../Controller/productController.js';
import { getAllCategories } from '../Controller/categoryController.js';
import { getBrands } from '../Controller/brandController.js';
import { addToWishList, getWishList, removeFromWishList } from '../Controller/wishlistController.js';
import { addToCart, clearCart, getCart, removeFromCart } from '../Controller/cartController.js';
import { addOrder, getCustomerOrders } from '../Controller/orderController.js';
import mongoose from 'mongoose';
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
    // console.log(req.user)
    const userId=req.user.id
    const items=await getCart(userId)
    res.status(200).json({
        statusCode:200,
        message:"Cart fetched successfully",
        data:items
    })
})


customerRouter.post("/carts/add/:productId",async(req,res)=>{
    // console.log(req.user)
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
    // console.log(req.user);
    const userId = req.user.id;
    const productId = req.params.productId;
    const items = await removeFromCart(userId, productId);
    res.status(200).json({
        statusCode: 200,
        message: "Product removed from cart successfully",
        data: items,
    });
})


customerRouter.post("/add-order",async(req,res)=>{
    try{
        // console.log(req.user)
        const userId = req.user.id;
        const order = req.body;
        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ error: "Invalid userId format" });
        }
        await addOrder(order,userId);
        await clearCart(userId);

        
      
    res.status(200).json({
        statusCode:200,
        message:"Order placed successfully",
        data:order
    })
    }
    catch(err){
        console.log(err.message)
        res.status(500).json({
            statusCode:500,
            message:err.message
        })
    }
})

customerRouter.get("/orders",async(req,res)=>{
    const userId=req.user.id
    const orders=await getCustomerOrders(userId)
    res.status(200).json({
        statusCode:200,
        message:"Orders fetched successfully",
        data:orders
    })
})


export default customerRouter