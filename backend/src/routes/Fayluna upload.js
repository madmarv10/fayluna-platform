// routes/uploadRoutes.js
import express from "express";
import { uploadImage, deleteImage } from "../controllers/Fayluna uploadController.js";

const router = express.Router();

router.post("/image", uploadImage);

export default router;
