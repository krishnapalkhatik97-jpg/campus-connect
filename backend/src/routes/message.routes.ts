import { Router } from "express";
import {
  sendMessage,
  getMessages,
} from "../controllers/message.controller";
import { protect } from "../middleware/auth.middleware";

const router = Router();

router.post("/", protect, sendMessage);
router.get("/:conversationId", protect, getMessages);

export default router;