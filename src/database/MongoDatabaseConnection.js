import mongoose from "mongoose";


export default async function connectToMongoDB(url){
    try{
        const connection = await mongoose.connect(url)
        console.log("Connected to MongoDB")
    }
    catch (e){
        console.log("Error in connecting to MongoDB",e)
        process.exit(1)
    }
}