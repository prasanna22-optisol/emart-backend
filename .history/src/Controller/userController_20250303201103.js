import User from "../Schema/user";

export async function getUserById(userId){
    if(!userId){
        throw new Error("Invalid userId");
    }
    const user = await User.findById(userId);

    if(!user){
        throw new Error("User not found");
    }

    return user.toObject();
}