import { Request, Response } from "express"
import * as reviewService from "../service/reviewService";
import * as submissionService from "../service/submissionService";

export const approveSubmission = async (
    req: Request,
    res: Response
) => {
    try {
        if (!req.user) {
            return res.status(401).json({message: "Not authorized"});
        }
        if (req.user.role.toLowerCase() !== "reviewer") {
            return res.status(403).json({message: "Only reviewers can approve submissions"});
        }

        const submission_id = parseInt(req.params.id as string, 10);
        const submission = await submissionService.findSubmissionById(submission_id);
        if (!submission) {
            return res.status(404).json({message: "Submission not found"});
        }
        const updatedSubmission =await reviewService.updateSubmissionStatus(submission_id,"approved");

        await reviewService.createReview({
            submission_id,
            user_id: req.user.id,
            status: "approved",
            created_at: new Date()
        });
        res.status(200).json(updatedSubmission);
    } catch (error) {
        res.status(500).json({message: "Error approving submission"});
    }
};

export const requestChanges = async (
    req: Request,
    res: Response
) => {
    try {
        if (!req.user) {
            return res.status(401).json({message: "Not authorized"});
        }

        if (req.user.role.toLowerCase() !== "reviewer") {
            return res.status(403).json({message: "Only reviewers can request changes"});
        }
        const submission_id = parseInt(req.params.id as string, 10);
        const submission =await submissionService.findSubmissionById(submission_id);

        if (!submission) {
            return res.status(404).json({
                message: "Submission not found"
            });
        }
        const updatedSubmission = await reviewService.updateSubmissionStatus(
                submission_id,
                "changes_requested"
            );
        await reviewService.createReview({
            submission_id,
            user_id: req.user.id,
            status: "changes_requested",
            created_at: new Date()
        });
        res.status(200).json(updatedSubmission);
    } catch (error) {
        res.status(500).json({message: "Error requesting changes"});
    }
};

export const getReviewHistory = async (
    req: Request,
    res: Response
) => {
    try {
        const submission_id = parseInt(req.params.id as string, 10);
        const submission = await submissionService.findSubmissionById(submission_id);
        if (!submission) {
            return res.status(404).json({message: "Submission not found"});
        }
        const reviews = await reviewService.findReviewsBySubmission(submission_id);

        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({message: "Error retrieving review history"});
    }
};