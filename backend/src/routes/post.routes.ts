import { Router } from "express";
import { createPost, getPosts } from "../controllers/post.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post("/", protect, createPost);
router.get("/", protect, getPosts);

export default router;