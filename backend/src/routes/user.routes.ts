import express from "express";
import { getMe } from "../controllers/user.controller";
import { protect } from "../middleware/auth.middleware";

const router = express.Router();

router.get("/me", protect, getMe);

export default router;