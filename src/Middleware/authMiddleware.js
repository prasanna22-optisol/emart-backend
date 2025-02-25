import jwt from "jsonwebtoken";

function verifyToken(req, res, next) {
    const authHeader = req.header('Authorization'); // Get the header

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({
            message: "Access denied due to missing or invalid token",
            statusCode: 401,
        });
    }

    const token = authHeader.split(" ")[1];
    // console.log("Token in backend: ", token) // Extract the actual token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // console.log("Decoded token : ", decoded) // Extract the actual token
        req.user = decoded;
        next(); // Call the next middleware
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            error: "Invalid token",
        });
    }
}

export function isAdmin(req, res,next) {
    console.log(req.user)
    if(req.user && req.user.isAdmin){
        next()
    }
    else if (req.user.isAdmin===false){
        return res.status(403).json({
            message: "Elevated privileges required",
            statusCode: 403,
        });
    }
}

export default verifyToken;
