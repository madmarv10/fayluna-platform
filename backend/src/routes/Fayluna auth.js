// routes/authRoutes.js
import express from "express";
import { register, login, logout, forgotPassword, resetPassword } from "../controllers/Fayluna authController.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

export default router;
