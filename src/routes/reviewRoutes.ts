import { Router } from "express";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.use(protect)
router.post('/reviews', );
router.get('/projects/:id/submissions', );
router.get('/submissions/:id', );
router.put('/submissions/:id/status', );
router.delete('/submissions/:id', );
export default router;