
import Product from './../Schema/product';


export async function 

export async function addToCart(req,res){
    try{
        let product=await Product.findOne({

        })
    }
    catch(err){
        return res.status(500).json({
            'message':err.message,
            'statusCode':500
        })
    }
}