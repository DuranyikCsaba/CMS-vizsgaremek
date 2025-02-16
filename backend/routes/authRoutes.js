import express from "express";
import * as authControllerJs from "../controllers/authController.js";
import { authenticateToken } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", authControllerJs.registerUser);

router.post("/login", authControllerJs.loginUser);

router.post('/logout', authControllerJs.logoutUser);

router.get('/user', authenticateToken, authControllerJs.getUser);

export default router;
