
import Product from './../Schema/product';
import Cart from './../Schema/cart';



export async function addToCart(userId,productId,quantity){
    let product=Cart.findOne({
        userId:userId,
        productId:productId
    })

    if(product){
        
    }
    else{
        let product=new Cart({
            userId:userId,
            productId:productId,
            quantity:quantity
        })
    }
}