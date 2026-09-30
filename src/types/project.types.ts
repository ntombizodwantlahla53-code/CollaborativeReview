export interface Project {
    project_id: number;
    title: string;
    user_id: number;
    Created_at: Date
    members_id: number[]
};

export type NewProject = Omit<Project, 'project_id' | 'Created_at' | 'user_id'>