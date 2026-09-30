import { Router } from "express";
import {addProjectMembers , deleteProjectMembers} from "../controllers/projectMembersControllers"
import { protect } from "../middleware/authMiddleware"

const router = Router();

router.use(protect)

router.post('/projects/:project_id/members', addProjectMembers);
router.delete('/projects/:project_id/members/:userId', deleteProjectMembers);

export default router;