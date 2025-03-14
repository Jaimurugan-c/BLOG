import express from "express";   // ✅ Import express first
import dotenv from "dotenv";
import cors from "cors";
import mongoose from "mongoose";

import blogRoutes from "./routes/blogRoutes.js";  // ✅ Import routes AFTER express

dotenv.config();

const app = express();  // ✅ Initialize `app` AFTER imports

app.use(express.json());
app.use(cors());

// ✅ Use routes after initializing `app`
app.use("/api/blogs", blogRoutes);

const PORT = process.env.PORT || 5000;

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => console.error("MongoDB connection error:", error));
