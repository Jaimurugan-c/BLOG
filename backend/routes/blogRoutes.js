import express from "express";
import {
  createBlog,
  getBlogs,
  getBlogById,
  updateBlog,
  deleteBlog
} from "../controllers/blogController.js";

const router = express.Router();

// Routes for blog operations
router.post("/", createBlog); // Create a new blog
router.get("/", getBlogs); // Get all blogs
router.get("/:id", getBlogById); // Get a single blog by ID
router.put("/:id", updateBlog); // Update a blog
router.delete("/:id", deleteBlog); // Delete a blog

export default router;
