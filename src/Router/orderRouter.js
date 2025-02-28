import express from 'express';
import { getAllOrders, updateOrderStatus } from '../Controller/orderController.js';

const orderRouter=express.Router()

orderRouter.get("/all",async(req,res)=>{
    const orders=await getAllOrders()
    return res.status(200).json({
        statusCode:200,
        message:"Orders fetched successfully",
        data:orders
    })
})




orderRouter.post("/status/:orderId",async(req,res)=>{
    try{
        const orderId=req.params.orderId
    const status=req.body.status
    await updateOrderStatus(orderId,status)
    return res.status(200).json({
        statusCode:200,
        message:"Order status updated successfully",
    })
    }
    catch(err){
        console.log(err.message)
        return res.status(500).json({
            statusCode:500,
            message:err.message})
    }
})

export default orderRouter