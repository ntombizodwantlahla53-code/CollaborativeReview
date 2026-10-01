export interface Submission {
    submission_id: number;
    project_id: number;
    code: string;
    status: "pending" | "in_review" | "approved" | "changes_requested";
    created_at: Date;
}

export type NewSubmission = Omit<
    Submission,
    "submission_id" | "created_at"
>;