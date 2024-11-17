import express from "express";
import {
  shareBrainContent,
  getBrainContent,
} from "../controllers/brainController";

const router = express.Router();

router.post("/share", shareBrainContent);
router.get("/:shareLink", getBrainContent);

export default router;
