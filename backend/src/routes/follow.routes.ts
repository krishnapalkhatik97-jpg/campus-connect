import { Router } from "express";
import { protect } from "../middleware/auth.middleware";
import { toggleFollow } from "../controllers/follow.controller";

const router = Router();

router.post("/:userId", protect, toggleFollow);

export default router;