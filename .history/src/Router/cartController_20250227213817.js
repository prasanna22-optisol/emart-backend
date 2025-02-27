
import Cart from './../Schema/cart.js';



export async function addToCart(userId,productId,quantity){
    let product=await Cart.findOne({
        userId:userId,
        productId:productId
    })

    if(product){
        if (product.quantity + quantity <= 0) {
            await removeFromCart(userId, productId);
          } else {
            await Cart.findByIdAndUpdate(product._id, {
              quantity: product.quantity + quantity,
            });
        }
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