import express from "express";
import Post from "../models/Post.js";

const router = express.Router();

// ✅ Create a new blog post
router.post("/", async (req, res) => {
  try {
    const { title, content, author, image } = req.body;

    if (!title || !content || !author) {
      return res.status(400).json({ message: "Title, content, and author are required" });
    }

    const newPost = new Post({ title, content, author, image });
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Get all blog posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().sort({ createdAt: -1 }); // Sort by latest
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// ✅ Get a single blog post by ID
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: "Invalid ID or server error" });
  }
});

// ✅ Update a blog post
router.put("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedPost);
  } catch (error) {
    res.status(500).json({ message: "Invalid ID or server error" });
  }
});

// ✅ Delete a blog post
router.delete("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ message: "Post not found" });

    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Invalid ID or server error" });
  }
});

export default router;
