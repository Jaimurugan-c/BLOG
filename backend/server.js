import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";
import blogRoutes from "./routes/blogRoutes.js"; // ✅ Import blog routes

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/blogs", blogRoutes); // ✅ Connect the blog routes

// Database Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Connection Error: ", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
