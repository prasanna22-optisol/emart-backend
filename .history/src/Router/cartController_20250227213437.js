
import Cart from './../Schema/cart.js';



export async function addToCart(userId,productId,quantity){
    let product=Cart.findOne({
        userId:userId,
        productId:productId
    })

    if(product){
        Cart.findOneAndUpdate(product._id,{
            quantity:quantity+product.quantity
        })
        await product.save()
    }
    else{
        let product=new Cart({
            userId:userId,
            productId:productId,
            quantity:quantity
        })

        await product.save()
    }
}

export async function removeFromCart(userId,productId){
    await Cart.findOneAndDelete({
        userId:userId,
        productId:productId
    })
}

export async function getCart(userId){
    const products=await Cart.find({
        userId:userId
    }).populate("productId")

    return products.map(p=>{
        return { quantity: x.quantity, product: x.productId }
    })
}