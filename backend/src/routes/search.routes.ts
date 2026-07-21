import { Router } from "express";
import { protect } from "../middleware/auth.middleware";
import { searchUsers } from "../controllers/search.controller";

const router = Router();

router.get("/", protect, searchUsers);

export default router;