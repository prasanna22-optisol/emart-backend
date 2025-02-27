import Product from "../Schema/product.js"
import WishList from "../Schema/wishlist.js"
import mongoose from "mongoose"

export async function addToWishList(req,res){
    try{
        const userId = req.user.id;
        const productId = req.query.productId;

        

        let existingProduct = await Product.findById(productId);
        if (!existingProduct) {
            return res.status(404).json({ message: 'Product not found', statusCode: 404 });
        }

        // let existingWishListProduct = await WishList.findOne({ userId, productId });
        // if (existingWishListProduct) {
        //     return res.status(400).json({ message: 'Product already exists in wishlist', statusCode: 400 });
        // }

        const newWishList = new WishList({ userId, productId });
        await newWishList.save();

        return res.status(201).json({
            message: 'Product added to wishlist successfully',
            statusCode: 201,
            data: newWishList.toObject(),
        });
    }
    catch(err){
        console.log(err)
        return res.status(500).json({
            'message':err.message,
           'statusCode':500
        })
    }
}

export async function removeFromWishList(req,res){
    try{
        const userId=req.user.id
        const productId=req.params.id
        const toBeDeleted=await WishList.findOne({userId,productId})
        if(!toBeDeleted){
            return res.status(404).json({
                'message':'Product not found in wishlist',
                'statusCode':404
            })
        }
        await WishList.deleteMany({userId,productId})
        return res.status(202).json({
            'message':'Product removed from wishlist successfully',
            'statusCode':202,
            'data':toBeDeleted.toObject()

        })
    }
    catch(err){
        return res.status(500).json({
            'message':err.message,
           'statusCode':500
        })
    }
}

export async function getWishList(req,res){

    try{
        const userId=req.user.id
        const wishLists=await WishList.find({userId}).populate('productId')
        const wishListsObjects=wishLists.map((w)=>w.toObject())
        return res.status(200).json({
            'message':'Wishlist fetched successfully',
            'statusCode':200,
            'data':wishListsObjects
        })
    }
    catch(err){
        return res.status(500).json({
            'message':err.message,
           'statusCode':500
        })
    }

}