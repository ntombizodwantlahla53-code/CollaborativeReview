import { Router } from "express";
import { protect } from "../middleware/authMiddleware"

const router = Router();

router.use(protect)

export default router;