import { query } from "../config/database";
import { Project, NewProject } from "../types/project.types";

export const createProject = async (
    appData: NewProject,
    user_id: number
): Promise<Project> =>{
    const {title} = appData
    const {rows} = await query("INSERT INTO projects (title, user_id) VALUES ($1, $2) RETURNING *",
        [title, user_id]
    );
    return rows[0];
};

export const findAllProjects = async(
    user_id:number
) : Promise<Project[]> =>{
    const {rows} = await query(
        "SELECT * FROM projects ORDER BY Created_at DESC",  [user_id]
    );
    return rows;
};

export const findProjectById = async (
    project_id: number,
    user_id :number
): Promise<Project | null> => {
    const { rows } = await query("SELECT * FROM projects WHERE project_id = $1 AND user_id = $2", [
        project_id, user_id
    ]);
    return rows[0] || null;
};

export const updateProject = async (
    project_id:number, 
    appData: {title: string},
    user_id :number
): Promise<Project | null> => {
    const {rows} = await query (
        "UPDATE projects SET title = $1 WHERE project_id = $2 AND user_id = $3 RETURNING *", 
        [appData.title, project_id, user_id]
    );
    return rows[0] || null
};

export const deleteProject = async (
    project_id: number,
    user_id:number 
): Promise<Project | null> => {
    const { rows } = await query (
        "DELETE FROM projects WHERE project_id = $1 AND user_id = $2 RETURNING *",
        [project_id, user_id]
    );
    return rows[0] || null;
};