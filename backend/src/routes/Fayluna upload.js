// routes/uploadRoutes.js
import express from "express";
import { uploadImage } from "../controllers/uploadController.js";

const router = express.Router();

router.post("/image", uploadImage);

export default router;
