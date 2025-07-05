// routes/userRoutes.js
import express from "express";
import {
  getUserProfile,
  updateUserProfile,
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing,
  getMyProfile
} from "../controllers/Fayluna userController.js";

const router = express.Router();

router.get("/:id", getUserProfile);
router.put("/:id", updateUserProfile);
router.post("/:id/follow", followUser);
router.post("/:id/unfollow", unfollowUser);
router.get("/:id/followers", getFollowers);
router.get("/:id/following", getFollowing);
router.get("/my-profile", getMyProfile);

export default router;
