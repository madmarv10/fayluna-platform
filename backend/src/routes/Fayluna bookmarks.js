// routes/bookmarkRoutes.js
import express from "express";
import {
  getBookmarks,
  addBookmark,
  removeBookmark
} from "../controllers/bookmarkController.js";

const router = express.Router();

router.get("/:userId", getBookmarks);
router.post("/", addBookmark);
router.delete("/", removeBookmark);

export default router;
