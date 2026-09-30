import { Request, Response } from "express";
import * as projectMembersService from "../service/projectMembersService"

export const addProjectMembers = async (req: Request, res:Response) => {
    try{
            if (!req.user) {
            return res.status(401).json({ message: "jnn aut" });
        }
            const project_id = parseInt(req.params.project_id as string, 10)
            const { user_id } = req.body;

        if (!user_id) {
            return res.status(400).json({message: "user_id is required"
            });
        }
            const AddProjectMembers = await projectMembersService.AddProjectMembers(
                project_id, parseInt(user_id, 10)
            );

        if (!AddProjectMembers) {
            return res.status(404).json({message: "Project or user not found"
            });
        }
        res.status(200).json(AddProjectMembers);
    } catch (error: any) {
        if (error instanceof Error && error.message === "Only reviewers can be added as project members") {
            return res.status(400).json({ message: error.message });
        }
        res.status(500).json({
            message: "Error adding project member"
        });
    }
};


export const deleteProjectMembers = async (req: Request, res: Response) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Not authorized" });
        }
        const project_id = parseInt(req.params.project_id as string, 10);
        const user_id = parseInt(req.params.userId as string, 10);
        const deleteProjectMembers = await projectMembersService.deleteProjectMembers(
                project_id,
                user_id
            );

        if (!deleteProjectMembers) {
            return res.status(404).json({ message: "Project not found"
            });
        }
        res.status(200).json({ message: "Project member removed successfully"
        });

    } catch (error) {
        res.status(500).json({ message: "Error deleting project member"
        });
    }
};