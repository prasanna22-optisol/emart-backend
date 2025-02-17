import express from "express"

import dotenv from "dotenv"
import connectToMongoDB from "./database/MongoDatabaseConnection.js";
import cookieParser from "cookie-parser";
import categoryRouter from "./Router/categoryRouter.js";

dotenv.config()

const app=express()

const port=process.env.PORT
const url=process.env.MONGO_URL


app.use(express.json())
app.use(cookieParser())
app.use(express.urlencoded({extended:true}))

app.use("/api/category",categoryRouter)

app.get("/",(req,res)=> {
    res.json({'message':'Hello World'})
})


app.listen(port,()=>{
    console.debug(`http://localhost:${port}`)
})

connectToMongoDB(url)
