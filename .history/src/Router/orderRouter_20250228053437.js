import express from 'express';

const orderRouter=express.Router()

orderRouter.get("/all",async(req,res)=>{
    const orders=await getAllOrders()
    return res.status(200).json({
        statusCode:200,
        message:"Orders fetched successfully",
        data:orders
    })
})




orderRouter.post("/status/:id",async(req,res)=>{
    const id=req.params.id
    const status=req.body.status
    await updateOrderStatus(id,status)
    return res.status(200).json({
        statusCode:200,
        message:"Order status updated successfully",
    })
})

export default orderRouter