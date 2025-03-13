import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

// Import routes AFTER initializing `app`
import authRoutes from "./routes/authRoutes.js";
import postRoutes from "./routes/PostRoutes.js";

// Load environment variables
dotenv.config();

const app = express(); // ✅ Now app is initialized

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/api/auth", authRoutes); // ✅ Now it's safe to use app
app.use("/api/posts", postRoutes);

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch((error) => console.log(error));
