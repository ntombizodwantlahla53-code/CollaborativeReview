export interface Submission {
    submission_id: number;
    project_id: number;
    status: "pending" | "approved" | "rejected";
    created_at: Date;
}

export type NewSubmission = Omit<
    Submission,
    "submission_id" | "created_at" | "status"
>;