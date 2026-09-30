import { query } from "../config/database";
import { Submission, NewSubmission } from "../types/submission.types";

export const createSubmission = async (
    appData: NewSubmission
): Promise<Submission> => {
    const { project_id } = appData;
    const { rows } = await query(`INSERT INTO submissions (project_id) VALUES ($1) RETURNING *`,
        [project_id]
    );
    return rows[0];
};

export const findSubmissionsByProject = async (
    project_id: number
): Promise<Submission[]> => {
    const { rows } = await query(`SELECT * FROM submissions WHERE project_id = $1 ORDER BY created_at DESC`,
        [project_id]
    );

    return rows;
};

export const findSubmissionById = async (
    submission_id: number
): Promise<Submission | null> => {
    const { rows } = await query(`SELECT * FROM submissions WHERE submission_id = $1`,
        [submission_id]
    );
    return rows[0] || null;
};

export const updateSubmissionStatus = async (
    submission_id: number,
    status: "pending" | "approved" | "rejected"
): Promise<Submission | null> => {
    const { rows } = await query(
        `UPDATE submissions
         SET status = $1
         WHERE submission_id = $2
         RETURNING *`,
        [status, submission_id]
    );
    return rows[0] || null;
};

export const deleteSubmission = async (
    submission_id: number
): Promise<Submission | null> => {
    const { rows } = await query(`DELETE FROM submissions WHERE submission_id = $1 RETURNING *`,
        [submission_id]
    );
    return rows[0] || null;
};