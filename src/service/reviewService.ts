import { query } from "../config/database";
import { Review, NewReview } from "../types/review.types"

export const createReview = async (
    appData: NewReview
): Promise<Review> => {
    const { submission_id, user_id, status } = appData;
    const { rows } = await query(
        `INSERT INTO reviews
        (submission_id, user_id, status)
        VALUES ($1, $2, $3)
        RETURNING *`,
        [submission_id, user_id, status]
    );
    return rows[0];
};

export const updateSubmissionStatus = async (
    submission_id: number,
    status: "approved" | "changes_requested") => {
    const { rows } = await query(
        `UPDATE submissions
         SET status = $1
         WHERE submission_id = $2
         RETURNING *`,
        [status, submission_id]
    );
    return rows[0] || null;
};

export const findReviewsBySubmission = async (
    submission_id: number
): Promise<Review[]> => {
    const { rows } = await query(
        `SELECT * FROM reviews
         WHERE submission_id = $1
         ORDER BY created_at DESC`,
        [submission_id]
    );
    return rows;
};