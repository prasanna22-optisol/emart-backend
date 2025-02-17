import mongoose from "mongoose";
import {Schema} from "mongoose";

const productSchema = new mongoose.Schema({
    name:String,
    shotDescription:String,
    description:String,
    purchasePrice:Number,
    sellingPrice:Number,
    images:Array(String),
    categoryId:[
        {
            type:Schema.Types.ObjectId,
            ref:"categories"
        }
    ]
})

const Product=mongoose.model("products",productSchema)
export default Product;