export interface Comment {
    comment_id: number,
    submission_id: number,
    user_id :number,
    comment :string,
    line_number: number | null,
    created_at : Date
};

export type NewComment = Omit<Comment, 'comment_id' | 'created_at'>
