import { query } from "../config/database";
import { Project, NewProject } from "../types/project.types";

export const createProject = async (
    appData: NewProject,
    userId: number
): Promise<Project> =>{
    const {title, user_id} = appData
    const {rows} = await query("INSERT INTO projects (title, user_id, user_id) VALUES ($1, $2, $3, $4) RETURNING *",
        [title, user_id, userId]
    );
    return rows[0];
};

export const findAllProjects = async() : Promise<Project[]> =>{
    const {rows} = await query(
        "SELECT * FROM projects ORDER BY applied_at DESC"
    );
    return rows;
};

export const findProjectById = async (
    project_id: number
): Promise<Project | null> => {
    const { rows } = await query("SELECT * FROM projects WHERE project_id = $1", [
        project_id,
    ]);
    return rows[0] || null;
};

export const updateProject = async (
    project_id:number, 
    appData: Project
): Promise<Project | null> => {
    const {rows} = await query (
        "UPDATE projects SET status = $1 WHERE project_id = $2 RETURNING *", 
        [project_id]
    );
    return rows[0] || null
};

export const deleteProject = async (
    project_id: number 
): Promise<Project | null> => {
    const { rows } = await query (
        "DELETE FROM projects WHERE project_id = $1 RETURNING *",
        [project_id]
    );
    return rows[0] || null;
}