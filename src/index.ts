import express from "express";
import dotenv from "dotenv";

import connectDb from "./config/db";
import authRoutes from "./routes/authRoutes";
import contentRoutes from "./routes/contentRoutes";
import brainRoutes from "./routes/brainRoutes";
import { authMiddleware } from "./middleware/middleware";

dotenv.config();

const app = express();
app.use(express.json());

connectDb();

app.use(express.json());

app.use("/api/v1", authRoutes);
app.use("/api/v1/content", authMiddleware, contentRoutes);
app.use("/api/v1/brain", authMiddleware, brainRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
