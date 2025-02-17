import Category from "../Schema/category.js";


export async function addCategory(req,res){
    try{
        let categoryName=req.body.name

        if(!categoryName){
            return res.status(400).json({
                'message':'Category name is required',
                'statusCode':400
            })
        }

        let existingCategory=await Category.findOne({
            name:categoryName
        })

        if(existingCategory){
            return res.status(400).json({
                'message':'Category already exists',
                'statusCode':400
            })
        }

        let newCategory=new Category({
            name:categoryName
        })

        await newCategory.save()

        return res.status(201).json({
            'message': 'Category added successfully',
            'statusCode': 201,
            'data': newCategory
        })

    }
    catch(err){
        return res.status(500).json({
            'message':err.message,
            'statusCode':500
        })
    }

}

export async function updateCategory(req,res){
    try{
        let categoryName=req.body.name
        let categoryId=req.params.id

        if(!categoryName){
            return res.status(400).json({
                'message':'Category name is required',
                'statusCode':400
            })
        }

        if(!categoryId){
            return res.status(400).json({
                'message':'Category id is required',
                'statusCode':400
            })
        }

        let updatedCategory = await Category.findByIdAndUpdate(
            categoryId,
            { name: categoryName },
            { new: true } // Ensures it returns the updated document
        );

        if(!updatedCategory) {
            return res.status(404).json({
                'message': 'Category not found',
                'statusCode': 404
            })
        }


        return res.status(200).json({
            'message':'Category updated successfully',
            'statusCode':200,
            'data':updatedCategory
        })


    }
    catch(err){
        return res.status(500).json({
            'message':err.message,
            'statusCode':500
        })
    }
}

export async function deleteCategory(req,res) {
    try {
        let categoryId = req.params.id

        if (!categoryId) {
            return res.status(400).json({
                'message': 'Category id is required',
                'statusCode': 400
            })
        }

        let deletedCategory = await Category.findByIdAndDelete(categoryId);

        if (!deletedCategory) {
            return res.status(404).json({
                'message': 'Category not found',
                'statusCode': 404
            })
        }

        return res.status(200).json({
            'message': 'Category deleted successfully',
            'statusCode': 200,
            'data': deletedCategory
        })
    }
    catch(err){
        return res.status(500).json({
            'message':err.message,
            'statusCode':500
        })
    }

}