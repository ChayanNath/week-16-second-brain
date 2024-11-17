import express from "express";
import {
  createContent,
  getContent,
  deleteContent,
} from "../controllers/contentController";

const router = express.Router();

router.post("/", createContent);
router.get("/", getContent);
router.delete("/", deleteContent);

export default router;
