import express from "express";
import mongoose from "mongoose";
import * as dotenv from "dotenv";
import { todoRouter } from "./todos.js";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

// Load environment variables
dotenv.config();

// Initialize express
const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Middleware
app.use(express.json());

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Use routes
app.use("/api", todoRouter);
app.use(express.static(join(__dirname, "public")));

// Serve the client app for the root route
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "public", "index.html"));
});

// Fallback to index for client-side routes
app.get("/*", (req, res) => {
  res.sendFile(join(__dirname, "public", "index.html"));
});

if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
