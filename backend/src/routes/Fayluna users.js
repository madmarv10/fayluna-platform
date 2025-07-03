// routes/userRoutes.js
import express from "express";
import {
  getUserById,
  updateUser,
  followUser,
  unfollowUser,
  getFollowers,
  getFollowing
} from "../controllers/userController.js";

const router = express.Router();

router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.post("/:id/follow", followUser);
router.post("/:id/unfollow", unfollowUser);
router.get("/:id/followers", getFollowers);
router.get("/:id/following", getFollowing);

export default router;
