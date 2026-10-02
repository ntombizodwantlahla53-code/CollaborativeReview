export interface Review {
    review_id: number,
    submission_id: number,
    user_id :number,
    status: "approved" | "changes_requested";
    created_at: Date
};

export type NewReview = Omit<Review, 'review_id' | 'Created_at'>