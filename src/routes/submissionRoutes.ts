import { Router } from "express";
import { addSubmission,getSubmissionById, getSubmissionsByProject, deleteSubmission, updateSubmissionStatus } from "../controllers/submissionControllers";
import { protect } from "../middleware/authMiddleware";

const router = Router();

router.use(protect)


router.post('/submissions', addSubmission);
router.get('/projects/:id/submissions', getSubmissionsByProject);
router.get('/submissions/:id', getSubmissionById);
router.put('/submissions/:id/status', updateSubmissionStatus);
router.delete('/submissions/:id', deleteSubmission);

export default router;