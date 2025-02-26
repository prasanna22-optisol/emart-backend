import Product from "../Schema/product.js";

export async function addProduct(req, res) {
    try {
        let model = req.body
        let newProduct = new Product({
            ...model
        })
        await newProduct.save()
        return res.status(201).json({
            'message': 'Product added successfully',
            'statusCode': 201,
            'data': newProduct.toObject()
        })
    } catch (err) {
        return res.status(500).json({
            'message': err.message,
            'statusCode': 500
        })
    }
}

export async function updateProduct(req, res) {
    try {
        let {
            id
        } = req.params
        if (!id) {
            return res.status(400).json({
                'message': 'Product id is required',
                'statusCode': 400
            })
        }
        let existingProduct = await Product.findById(id)
        if (!existingProduct) {
            return res.status(404).json({
                'message': 'Product not found',
                'statusCode': 404
            })
        }
        let model = req.body
        let updatedProduct = await Product.findByIdAndUpdate(id, {
            ...model
        }, {
            new: true
        })
        return res.status(202).json({
            'message': 'Product updated successfully',
            'statusCode': 202,
            'data': updatedProduct.toObject()
        })
    } catch (err) {
        return res.status(500).json({
            'message': err.message,
            'statusCode': 500
        })
    }
}

export async function getAllProducts(req, res) {
    try {
        let products = await Product.find()
        let productObjects = products.map(p => p.toObject())
        return res.status(200).json({
            'message': 'Products fetched successfully',
            'statusCode': 200,
            'data': productObjects
        })
    } catch (err) {
        return res.status(500).json({
            'message': err.message,
            'statusCode': 500
        })
    }
}

export async function getProductById(req, res) {
    try {
        let {
            id
        } = req.params
        if (!id) {
            return res.status(400).json({
                'message': 'Product id is required',
                'statusCode': 400
            })
        }
        let product = await Product.findById(id)
        if (!product) {
            return res.status(404).json({
                'message': 'Product not found',
                'statusCode': 404
            })
        }
        return res.status(200).json({
            'message': 'Product fetched successfully',
            'statusCode': 200,
            'data': product.toObject()
        })
    } catch (err) {
        return res.status(500).json({
            'message': err.message,
            'statusCode': 500
        })
    }
}

export async function deleteProduct(req, res) {
    try {
        let {
            id
        } = req.params
        let product = await Product.findById(id)
        if (!product) {
            return res.status(404).json({
                'message': 'Product not found',
                'statusCode': 404
            })
        }
        await Product.findByIdAndDelete(id)
        return res.status(200).json({
            'message': 'Product deleted successfully',
            'statusCode': 200,
            'data': product
        })
    } catch (err) {
        return res.status(500).json({
            'message': err.message,
            'statusCode': 500
        })
    }
}

export async function getNewProducts(req, res) {
    try {
        const products = await Product.find({
            isNewProduct: true
        })

        let productObjects = products.map(p => p.toObject())
        return res.status(200).json({
            'message': 'New products fetched successfully',
            'statusCode': 200,
            'data': productObjects
        })
    } catch (err) {
        return res.status(500).json({
            'message': err.message,
            'statusCode': 500
        })
    }
}


export async function getFeaturedProducts(req, res) {
    try {
        const products = await Product.find({
            isFeatured: true
        })

        let productObjects = products.map(p => p.toObject())
        return res.status(200).json({
            'message': 'Featured products fetched successfully',
            'statusCode': 200,
            'data': productObjects
        })
    } catch (err) {
        return res.status(500).json({
            'message': err.message,
            'statusCode': 500
        })
    }
}

export async function getProductsListing(req, res) {
    try {
        let {
            searchTerm,
            categoryId,
            sortBy,
            sortOrder,
            brandId,
            pageSize,
            page
        } = req.query;

        if (!sortBy) {
            sortBy = "price";
        }
        if (!sortOrder) {
            sortOrder = -1;
        }
        let queryFilter = {};
        if (searchTerm) {
            queryFilter.$or = [{
                    name: {
                        $regex: ".*" + searchTerm + ".*",
                        $options:"i"
                    },
                },
                {
                    description: {
                        $regex: ".*" + searchTerm + ".*",
                        $options:"i"
                    },
                },
            ];
        }
        if (categoryId) {
            queryFilter.categoryId = categoryId;
        }
        if (brandId) {
            queryFilter.brandId = brandId;
        }
        // console.log("queryFilter", queryFilter);
        const products = await Product.find(queryFilter)
            .sort({
                [sortBy]: +sortOrder,
            })
            .skip((+page - 1) * +pageSize)
            .limit(+pageSize);

        let productObjects = products.map(p => p.toObject());
        return res.status(200).json({
            message: "Filtered products fetched successfully",
            statusCode: 200,
            data: productObjects,
        });
    } catch (err) {
        return res.status(500).json({
            message: err.message,
            statusCode: 500
        });
    }
}