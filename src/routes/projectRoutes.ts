import { Router } from "express";
import { addProject, getAllprojects, getProjectById ,updateProjectById, deleteProjectById} from "../controllers/projectControllers"
import { protect } from "../middleware/authMiddleware"

const router = Router();

router.use(protect)

router.post('/projects', addProject);
router.get('/projects', getAllprojects);
router.get('/projects/:project_id', getProjectById);
router.put('/projects/:project_id', updateProjectById);
router.delete('/projects/:project_id', deleteProjectById);

export default router;