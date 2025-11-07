import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";  
import { pool } from "../db/index.js";
import bcrypt from "bcryptjs";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken, verifyAccessToken, comparePassword } from "../utils/jwt.js";

export const registerUser = asyncHandler(async (req, res) => {
    try {
        const {username, email, password} = req.body;
    
        if (!username || !email || !password) {
            throw new ApiError(400, "All fields are required");
        }
    
        // check if user already exists
        const [existingUser] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
        if (existingUser.length > 0) {
            throw new ApiError(409, "User with email already exists");
        } 
    
        const hashedPassword = await bcrypt.hash(password, 10);
    
        const [result] = await pool.query("INSERT INTO users (username, email, password, refresh_token) VALUES (?, ?, ?, ?)", [username, email, hashedPassword, ""]);
    
        const [createdUser] = await pool.query("SELECT id, username, email FROM users WHERE id = ?", [result.insertId]);
    
    
        return res
                .status(201)
                .json(new ApiResponse(201, createdUser[0] ,"User registered successfully"));
    } catch (error) {
        return res
            .status(500)
            .json(new ApiResponse(500, "internal server error", error.message));
    }
})

export const loginUser = asyncHandler(async (req, res) => {
    try {
        const { email, password } = req.body;
        if(!email || !password) {
            throw new ApiError(400, "Email and password are required");
        }

        const [users] = await pool.query("SELECT * FROM users WHERE email = ?", [email]);
        if(users.length === 0) {
            throw new ApiError(401, "Invalid email or password");
        }

        const user = users[0];

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if(!isPasswordValid) {
            throw new ApiError(401, "Invalid email or password");
        }

        const tokenPayload = {
            id: user.id,
            email: user.email,
            username: user.username
        }

        const accessToken = generateAccessToken(tokenPayload);
        const refreshToken = generateRefreshToken(tokenPayload);

        await pool.query("UPDATE users SET refresh_token = ? WHERE id = ?", [refreshToken, user.id]);

        delete user.password;
        delete user.refresh_token;

        return res 
            .status(200)
            .json(new ApiResponse(200, { user, accessToken, refreshToken }, "User login successfully"));

    } catch (error) {
        console.log("Error while logging in the user: ", error);
        return res
            .status(500)
            .json(new ApiResponse(500, "internal server error", error.message));
    }
})

export const logout = asyncHandler(async (req, res) => {
    try {
        const userId = req.user.id;
    
        await pool.query("UPDATE users SET refresh_token = NULL WHERE id = ?", [userId]);
    
        return res
            .status(200)
            .json(new ApiResponse(200, "User logged out successfully"));
    } catch (error) {
        console.log("error while logging out: ", error);
        return res
            .status(500)
            .json(new ApiResponse(500, "internal server error", error.message));
    }
})

export const refreshAccessToken = asyncHandler(async (req, res) => {
    try {
        const { refreshToken } = req.body;
        if (!refreshToken) {
            throw new ApiError(400, "Refresh token is required");
        }
        const decoded = verifyRefreshToken(refreshToken);
        const [users] = await pool.query("SELECT * FROM users WHERE id = ?", [decoded.id]);
        if (users.length === 0 || users[0].refresh_token !== refreshToken) {
            throw new ApiError(401, "Invalid refresh token");
        }
        const newAccessToken = generateAccessToken({
            id: users[0].id,
            email: users[0].email,
            username: users[0].username
        })

        return res 
            .status(200)
            .json(new ApiResponse(200, { accessToken: newAccessToken }, "Access token refreshed successfully"));

    } catch (error) {
        
    }
})

export const changeCurrentPassword = asyncHandler(async (req, res) => {
    try {
        const userId = req.user.id;
        const { currentPassword, newPassword } = req.body;

        if(!currentPassword || !newPassword) {
            throw new ApiError(400, "Current password and new password are required");
        }

        const [users] = await pool.query("SELECT password FROM users WHERE id = ?", [userId]);
        if(users.length === 0) {
            throw new ApiError(404, "User not found");
        }

        const user = users[0];
        const isPasswordValid = await comparePassword(currentPassword, user.password);
        if(!isPasswordValid) {
            throw new ApiError(401, "Current password is incorrect");
        }

        const hashedNewPassword = await bcrypt.hash(newPassword, 10);
        await pool.query("UPDATE users SET password = ?, updated_at = NOW() WHERE id = ?", [hashedNewPassword, userId]);

        return res 
            .status(200)
            .json(new ApiResponse(200, "Password changed successfully"));
        
    } catch (error) {
        return res
            .status(500)
            .json(new ApiResponse(500, "internal server error during password change", error.message));
    }
})