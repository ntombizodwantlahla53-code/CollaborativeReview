import { Request, Response } from "express";
import * as commentService from "../service/commentService";

export const addComment = async (
    req: Request,
    res: Response
) => {
    try {
        if (!req.user) {
            return res.status(401).json({message: "Not authorized"});
        }
        if (req.user.role.toLowerCase() !== "reviewer") {
            return res.status(403).json({message: "Only reviewers can comment"});
        }
        const submission_id = parseInt(req.params.id as string, 10);
        const { comment, line_number } = req.body;
        if (!comment) {
            return res.status(400).json({message: "Comment is required"});
        }
        const newComment = await commentService.createComment({
            submission_id,
            user_id: req.user.id,
            comment,
            line_number: line_number?? null
        });
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({message: "Error creating comment"
        });
    }
}
export const getCommentsBySubmission = async (
    req: Request,
    res: Response
) => {
    try {
        const submission_id = parseInt(req.params.id as string, 10);
        const comments =await commentService.findCommentsBySubmission(submission_id);
        res.status(200).json(comments);
    } catch (error) {
        res.status(500).json({message: "Error retrieving comments"});
    }
};

export const getCommentById = async (
    req: Request,
    res: Response
) => {
    try {
        const comment_id = parseInt(req.params.id as string, 10);
        const comment =await commentService.findCommentById(comment_id);
        if (!comment) {
            return res.status(404).json({message: "Comment not found"});
        }
        res.status(200).json(comment);
    } catch (error) {
        res.status(500).json({message: "Error retrieving comment"});
    }
};
export const editComment = async (
    req: Request,
    res: Response
) => {
    try {
        if (!req.user) {
            return res.status(401).json({message: "Not authorized"});
        }
        if (req.user.role.toLowerCase() !== "reviewer") {
            return res.status(403).json({message: "Only reviewers can edit comments"});
        }
        const comment_id = parseInt(req.params.id as string, 10);
        const { comment, line_number } = req.body;
        if (!comment) {
            return res.status(400).json({message: "Comment is required"});
        }
        const updatedComment = await commentService.updateComment(comment_id,comment,line_number ?? null
        );
        if (!updatedComment) {
            return res.status(404).json({message: "Comment not found"
            });
        }
        res.status(200).json(updatedComment);
    } catch (error) {
        res.status(500).json({message: "Error updating comment"
        });
    }
};
export const deleteComment = async (
    req: Request,
    res: Response
) => {
    try {
        if (!req.user) {
            return res.status(401).json({message: "Not authorized"});
        }

        if (req.user.role.toLowerCase() !== "reviewer") {
            return res.status(403).json({message: "Only reviewers can delete comments"});
        }

        const comment_id = parseInt(req.params.id as string, 10);
        const comment =await commentService.deleteComment(comment_id);

        if (!comment) {
            return res.status(404).json({message: "Comment not found"});
        }
        res.status(200).json({message: "Comment deleted successfully"
        });
    } catch (error) {
        res.status(500).json({message: "Error deleting comment"});
    }
};