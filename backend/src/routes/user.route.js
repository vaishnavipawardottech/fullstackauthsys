import express from "express";
import { registerUser, loginUser, logout, refreshAccessToken, changeCurrentPassword } from "../controllers/user.controller.js";
import { authenticateToken } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", authenticateToken, logout);
router.post("/refresh-token", refreshAccessToken);
router.post("/change-password", authenticateToken, changeCurrentPassword);

export default router;