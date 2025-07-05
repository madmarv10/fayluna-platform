// routes/analyticsRoutes.js
import express from "express";
import {
  getUserAnalytics,
  getBlogAnalytics,
  getPlatformAnalytics
} from "../controllers/Fayluna analyticsController.js";

const router = express.Router();

router.get("/user/:userId", getUserAnalytics);
router.get("/blog/:blogId", getBlogAnalytics);
router.get("/platform", getPlatformAnalytics);

export default router;
