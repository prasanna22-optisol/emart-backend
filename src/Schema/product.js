import mongoose from "mongoose";
import {Schema} from "mongoose";

const productSchema = new mongoose.Schema({
    name: String,
    description: String,
    price: Number,
    discount: Number,
    images: Array(String),
    categoryId: { type: Schema.Types.ObjectId, ref: 'categories' },
    brandId: { type: Schema.Types.ObjectId, ref: 'brands' },
    isFeatured:Boolean,
    isNewProduct:Boolean
})

const Product=mongoose.model("products",productSchema)
export default Product;