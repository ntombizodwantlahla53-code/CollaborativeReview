import { Router } from "express";
import { addSubmission,getSubmissionById, getSubmissionsByProject, deleteSubmission, updateSubmissionStatus } from "../controllers/submissionControllers";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.use(protect)


router.post('/submissions', addSubmission);
router.get('/projects/:id/submissions', getSubmissionById);
router.get('/submissions/:id', getSubmissionsByProject);
router.put('/submissions/:id/status', updateSubmissionStatus);
router.delete('/submissions/:id', deleteSubmission);

export default router;