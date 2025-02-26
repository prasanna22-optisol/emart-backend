
export async function addToWishList(req,res){
    try{
        const userId=req.user.id
        const productId=req.params.id

        const newWishList=new WishList({
            userId,
            productId
        })

        await newWishList.save()

        return res.status(201).json({
            'message':'Product added to wishlist successfully',
            'statusCode':201,
            'data':newWishList.toObject()
        })
    }
    catch(err){
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
        await WishList.deleteMany({userId,productId})
        return res.status(202).json({
            'message':'Product removed from wishlist successfully',
            'statusCode':202
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