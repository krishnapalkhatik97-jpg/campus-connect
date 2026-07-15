import { Router } from "express";
import { protect } from "../middleware/auth.middleware";
import { toggleLike } from "../controllers/like.controller";

const router = Router();

router.post("/:id", protect, toggleLike);

export default router;