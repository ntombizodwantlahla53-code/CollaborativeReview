import { query } from "../config/database";
import { Project, NewProject } from "../types/project.types";

export const createProject = async (
    appData: NewProject,
): Promise<Project> =>{
    const {title} = appData
    const {rows} = await query("INSERT INTO projects (title) VALUES ($1) RETURNING *",
        [title]
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