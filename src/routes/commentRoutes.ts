import { Router } from "express";
import { protect } from "../middleware/authMiddleware"
import {addComment, getCommentsBySubmission,getCommentById,editComment,deleteComment} from "../controllers/commentControllers"

const router = Router();

router.use(protect)

router.post('/submissions/:id/comments', addComment);
router.get('/submissions/:id/comments', getCommentsBySubmission);
router.get('/comments/:id', getCommentById);
router.put('/comments/:id', editComment);
router.delete('/comments/:id', deleteComment);


export default router;