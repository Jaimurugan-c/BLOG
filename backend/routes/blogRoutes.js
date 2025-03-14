import express from "express";
import Blog from "../models/Blog.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a Blog Post
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, content, category, image } = req.body;
    const newBlog = new Blog({ title, content, category, image, author: req.user.id });

    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get All Blog Posts
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", "name email");
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get a Single Blog Post by ID
router.get("/:id", async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate("author", "name email");
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update a Blog Post
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { title, content, category, image } = req.body;
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ message: "Blog not found" });
    if (blog.author.toString() !== req.user.id) return res.status(403).json({ message: "Unauthorized" });

    blog.title = title;
    blog.content = content;
    blog.category = category;
    blog.image = image;

    await blog.save();
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a Blog Post
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);

    if (!blog) return res.status(404).json({ message: "Blog not found" });
    if (blog.author.toString() !== req.user.id) return res.status(403).json({ message: "Unauthorized" });

    await blog.deleteOne();
    res.json({ message: "Blog deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
