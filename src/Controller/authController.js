import bcrypt from "bcrypt"
import { loginValidation, registerValidation } from "../Validation/AuthValidation.js"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import User from "../Schema/user.js"

dotenv.config()

const secret=process.env.JWT_SECRET


export async function register(req,res){
    try{

        const {error}=registerValidation(req.body)

        if(error){
            return res.status(400).json({
                message:error.details[0].message,
                statusCode:400
            })
        }

        const {name,email,password,confirmPassword,isAdmin}=req.body
        if(password!==confirmPassword){
            return res.status(400).json({
                message:"Passwords do not match",
                statusCode:400
            })
        }
        const userExist=await User.findOne({email})
        if(userExist){
            return res.status(400).json({
                message:"Email already exists",
                statusCode:400
            })
        }
        const hashedPassword=await bcrypt.hash(password,10)
        const user=new User({
            name,
            email,
            password:hashedPassword,
            isAdmin:isAdmin ? true : false
        })
        await user.save()
        return res.status(201).json({
            message:"User created successfully",
            statusCode:201,
            data:{
                id:user._id,
                name:user.name,
                email:user.email,
                isAdmin:user.isAdmin
            }
        })
    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            'message':err.message,
            'statusCode':500
        })
    }
}


export async function login(req,res){
    try{
        const {error}=loginValidation(req.body)

        if(error){
            return res.status(400).json({
                message:error.details[0].message,
                statusCode:400
            })
        }

        const {email,password}=req.body
        const user=await User.findOne({email})

        if(!user){
            return res.status(401).json({
                message:"Invalid email or password",
                statusCode:401
            })
        }

        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(401).json({
                message:"Invalid email or password",
                statusCode:401
            })
        }

        const token=jwt.sign(
            {
                id: user._id,
                name: user.name,
                email: user.email,
                isAdmin: user.isAdmin,
            },
            process.env.JWT_SECRET,
            { expiresIn: '85h' }
        )

        return res.status(200).json({
            message:"Logged in successfully",
            statusCode:200,
            data:{
                token,
                user:{
                    id:user._id,
                    name:user.name,
                    email:user.email,
                    isAdmin:user.isAdmin
                }
            }
        })

    }
    catch(err){
        console.log(err);
        return res.status(500).json({
            'message':err.message,
            'statusCode':500
        })
    }
}