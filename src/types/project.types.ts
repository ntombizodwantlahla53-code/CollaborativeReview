export interface Project {
    project_id: number;
    title: string;
    user_id: number;
    Created_at: Date
};

export type NewProject = Omit<Project, 'project_id' | 'Created_at' | 'user_id'>