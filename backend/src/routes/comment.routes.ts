import { Router } from "express";
import {
  createComment,
  getComments,
} from "../controllers/comment.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post("/:id", protect, createComment);
router.get("/:id", protect, getComments);

export default router;