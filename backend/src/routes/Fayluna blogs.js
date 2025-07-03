// routes/blogRoutes.js
import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  searchBlogs
} from "../controllers/blogController.js";

const router = express.Router();

router.post("/", createBlog);
router.get("/", getAllBlogs);
router.get("/search", searchBlogs);
router.get("/:id", getBlogById);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);

export default router;
