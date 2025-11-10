import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken";

export const authenticateToken = asyncHandler(async (req, res, next) => {
    // try {
    //     const authHeader = req.headers['authorization'];
    //     const token = authHeader && authHeader.split(' ')[1];
    
    //     if (!token) {
    //         return res
    //             .status(401)
    //             .json(new ApiError(401, "authenticateToken is required"))
    //     }
    
    //     const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    //     req.user = decoded;
    //     next();
    // } catch (error) {
    //     return res
    //         .status(403)
    //         .json(new ApiError(403, "Invalid or expired token"))
    // }

     try {
        const token = req.cookies.accessToken;
        if (!token) {
            throw new ApiError(401, "Unauthorized: No token provided");
        }

        try {
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
            req.user = decoded;
            next(); 
        } catch (error) {
            throw new ApiError(401, "Invalid or expired token");
        }    
    } catch (error) {
        next(error);
    }
})