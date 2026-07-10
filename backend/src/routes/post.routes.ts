import { Router } from "express";
import { createPost } from "../controllers/post.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post("/", protect, createPost);

export default router;