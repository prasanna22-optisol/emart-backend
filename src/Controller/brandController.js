import Brand from "../Schema/brand.js";

export async function createBrand(req,res){

    try{
        let {name}=req.body
        if(!name){
            return res.status(400).json({
                'message':'Brand name is required',
                'statusCode':400
            })
        }
        let existingBrand=await Brand.findOne({
            name:name
        })
        if(existingBrand){
            return res.status(400).json({
                'message':'Brand already exists',
                'statusCode':400
            })
        }
        let newBrand=new Brand({
            name:name
        })
        await newBrand.save()
        return res.status(201).json({
            'message':'Brand created successfully',
            'statusCode':201,
            'data':newBrand
        })
    }
    catch(err){
        return res.status(500).json({
            'message':err.message,
            'statusCode':500
        })
    }

}

export async function getBrands(req,res){
    try{
        let brands=await Brand.find()
        let brandObjects=brands.map((b)=>b.toObject())
        return res.status(200).json({
            'message':'Brands fetched successfully',
            'statusCode':200,
            'data':brandObjects
        })
    }
    catch(err){
        return res.status(500).json({
            'message':err.message,
            'statusCode':500
        })
    }
}

export async function getBrandById(req,res){
    try{
        const {id}=req.params
        let brand=await Brand.findById(id)
        if(!brand){
            return res.status(404).json({
                'message':'Brand not found',
                'statusCode':404
            })
        }
        return res.status(200).json({
            'message':'Brand fetched successfully',
            'statusCode':200,
            'data':brand.toObject()
        })
    }
    catch(err) {
        return res.status(500).json({
            'message': err.message,
            'statusCode': 500
        })
    }
}

export async function updateBrand(req,res){
    try{
        const {id}=req.params
        const {name}=req.body
        let brand=await Brand.findById(id)
        if(!brand){
            return res.status(404).json({
                'message':'Brand not found',
                'statusCode':404
            })
        }
        let updatedBrand=await Brand.findByIdAndUpdate(id,{
            name:name
        },{new:true})

        if(!updatedBrand){
            return res.status(500).json({
                'message':'Error updating brand',
                'statusCode':500
            })
        }
        return res.status(202).json({
            'message':'Brand updated successfully',
            'statusCode':202,
            'data':updatedBrand
        })
    }
    catch(err){
        return res.status(500).json({
            'message':err.message,
            'statusCode':500
        })
    }
}

export async function deleteBrand(req,res){
    try{
        let {id}=req.params
        let brand=await Brand.findById(id)
        await Brand.findByIdAndDelete(id)
        return res.status(202).json({
            'message':'Brand deleted successfully',
            'statusCode':202,
            'data':brand
        })
    }
    catch(err){
        return res.status(500).json({
            'message':err.message,
            'statusCode':500
        })
    }
}