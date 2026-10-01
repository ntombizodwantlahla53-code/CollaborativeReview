import { Request, Response } from "express";
import * as submissionService from "../service/submissionService";

export const addSubmission = async (
    req: Request,
    res: Response
) => {
    try {
        const newSubmission =await submissionService.createSubmission(
            req.body);
        res.status(201).json(newSubmission);
    } catch (error) {
        res.status(500).json({ message: "Error creating submission"
        });
    }
};
export const getSubmissionsByProject = async (
    req: Request,
    res: Response
) => {
    try {
        const project_id = parseInt(req.params.id as string, 10);
        const submissions =await submissionService.findSubmissionsByProject(project_id);
        res.status(200).json(submissions);
    } catch (error) {
        res.status(500).json({ message: "Error retrieving submissions"
        });
    }
};

export const getSubmissionById = async (
    req: Request,
    res: Response
) => {
    try {
        const submission_id = parseInt(req.params.id as string,10);
        const submission =await submissionService.findSubmissionById(submission_id);

        if (!submission) {
            return res.status(404).json({message: "Submission not found"
            });
        }

        res.status(200).json(submission);
    } catch (error) {
        res.status(500).json({
            message: "Error retrieving submission"
        });
    }
};

export const updateSubmissionStatus = async (
    req: Request,
    res: Response
) => {
    try {
        const submission_id = parseInt(req.params.id as string,10);
        const { status } = req.body;
        if (!["pending" , "in_review" , "approved" , "changes_requested"].includes(status)) {
            return res.status(400).json({ message: "Invalid submission status"
            });
        }
        const submission =await submissionService.updateSubmissionStatus(submission_id,status);
        if (!submission) {
            return res.status(404).json({ message: "Submission not found"
            });
        }
        res.status(200).json(submission);
    } catch (error) {
        res.status(500).json({
            message: "Error updating submission status"
        });
    }
};

export const deleteSubmission = async (
    req: Request,
    res: Response
) => {
    try {
        const submission_id = parseInt(req.params.id as string,10
        );

        const submission =
            await submissionService.deleteSubmission(submission_id);

        if (!submission) {
            return res.status(404).json({ message: "Submission not found"
            });
        }
        res.status(200).json({ message: "Submission deleted successfully"
        });
    } catch (error) {
        res.status(500).json({ message: "Error deleting submission"
        });
    }
};