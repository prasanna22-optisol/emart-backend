import bcrypt from "bcrypt"

export async function register(req,res){
    try{
        const {name,email,password}=req.body
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
            password:hashedPassword
        })
        await user.save()
        return res.status(201).json({
            message:"User created successfully",
            statusCode:201
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