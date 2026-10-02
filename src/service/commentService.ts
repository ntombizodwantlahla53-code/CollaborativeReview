import { query } from "../config/database";
import { Comment, NewComment } from "../types/comment.types";


export const createComment = async (
    appData: NewComment
): Promise<Comment> => {
    const { submission_id ,user_id ,comment ,line_number} = appData;
    const { rows } = await query(`INSERT INTO comments (submission_id ,user_id ,comment ,line_number) VALUES ($1, $2, $3, $4) RETURNING *`,
        [submission_id ,user_id ,comment ,line_number]
    );
    return rows[0];
};

export const findCommentsBySubmission = async (
    submission_id: number
): Promise<Comment[]> => {
    const { rows } = await query(`SELECT * FROM comments WHERE submission_id = $1 ORDER BY created_at ASC`,
        [submission_id]
    );
    return rows;
};

export const findCommentById = async (
    comment_id: number
): Promise<Comment | null> => {
    const { rows } = await query(`SELECT * FROM comments WHERE comment_id = $1`,
        [comment_id]
    );
    return rows[0] || null;
};

export const updateComment = async (
    comment_id: number,
    comment:string,
    line_number: number | null
): Promise<Comment | null> => {
    const { rows } = await query(
        `UPDATE comments
         SET comment = $1, line_number =$2
         WHERE comment_id = $2
         RETURNING *`,
        [comment_id, comment, line_number]
    );
    return rows[0] || null;
};

export const deleteComment = async (
    comment_id: number
): Promise<Comment | null> => {
    const { rows } = await query(`DELETE FROM comments WHERE comment_id = $1 RETURNING *`,
        [comment_id]
    );
    return rows[0] || null;
};