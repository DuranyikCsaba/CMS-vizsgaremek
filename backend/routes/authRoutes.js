import express from "express";
import * as authControllerJs from "../controllers/authController.js";

const router = express.Router();

router.post("/register", authControllerJs.registerUser);

router.post("/login", authControllerJs.loginUser);

router.post('/logout', authControllerJs.logoutUser);

export default router;
