import express from "express";
import { getBlogs, getBlogById, createBlog, updateBlog, deleteBlog } from "../controllers/blogController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getBlogs);
router.get("/:id", getBlogById);
router.post("/", protect, createBlog);  // Only logged-in users can create blogs
router.put("/:id", protect, updateBlog); // Only logged-in users can update blogs
router.delete("/:id", protect, deleteBlog); // Only logged-in users can delete blogs

export default router;
