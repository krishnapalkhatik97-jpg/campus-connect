import { Router } from "express";
import {
  createConversation,
  getConversations,
} from "../controllers/conversation.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post("/", protect, createConversation);
router.get("/", protect, getConversations);

export default router;