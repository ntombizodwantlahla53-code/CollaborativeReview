import { Router } from "express";
import { protect } from "../middleware/authMiddleware";
import {approveSubmission,requestChanges,getReviewHistory} from "../controllers/reviewControllers";

const router = Router();

router.post('/submissions/:id/approve', approveSubmission);
router.post('/submissions/:id/request-changes', requestChanges);
router.get('/submissions/:id/reviews', getReviewHistory);

export default router;