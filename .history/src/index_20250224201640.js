import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectToMongoDB from "./database/MongoDatabaseConnection.js";
import cookieParser from "cookie-parser";
import categoryRouter from "./Router/categoryRouter.js";
import brandRouter from "./Router/brandRouter.js";
import productRouter from "./Router/productRouter.js";
import customerRouter from "./Router/customerRouter.js";

dotenv.config()

const app=express()

const port=process.env.PORT
const url=process.env.MONGO_URL


app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE','PATCH']  // Allowing specific methods for CORS request.
}))
app.use(express.urlencoded({extended:true}))

app.use("/api/category",categoryRouter)
app.use("/api/brand",brandRouter)
app.use("/api/product",productRouter)
app.use("/api/home",customerRouter)

app.get("/",(req,res)=> {
    res.json({'message':'Hello World'})
})


app.listen(port,()=>{
    console.debug(`http://localhost:${port}`)
})

connectToMongoDB(url)
