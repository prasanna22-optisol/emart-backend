import Order from "../Schema/order";

export async function addOrder(orderModel,userId){
    let order=new Order({
        ...orderModel,
        userId:userId,
        status:"in-progress"
    })

    await order.save()
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

