import Order from "../Schema/order.js";
import mongoose from "mongoose";
export async function addOrder(orderModel,userId){
    // if (!mongoose.Types.ObjectId.isValid(userId)) {
    //     throw new Error("Invalid userId format");
    // }

    // console.log("Order Model", orderModel);

    let order = new Order({
        ...orderModel,
        userId,
        status: "inprogress",
    });

    // console.log("Order Recieved", order);

    await order.save();
}

export async function getCustomerOrders(userId){
    let orders=await Order.find({
        userId:userId
    })

    return orders.map(p=>p.toObject())
}

export async function getAllOrders(){
    let orders=await Order.find()

    return orders.map(p=>p.toObject())
}

export async function updateOrderStatus(orderId,status){
    await Order
        .findByIdAndUpdate(orderId, {
            status: status,
        })
    
}

