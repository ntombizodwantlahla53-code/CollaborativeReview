import { query } from "../config/database";
import { Project, NewProject } from "../types/project.types";

export const AddProjectMembers = async (
    project_id: number,
    user_id:number 
): Promise<Project | null> => {
    const user = await query(
        "SELECT id, role FROM users WHERE id = $1",
        [user_id]
    );

    if (user.rows.length === 0) {
        return null;
    }

    const userRole = String(user.rows[0].role ?? "").trim();
    if (userRole.toLowerCase() !== "reviewer") {
        throw new Error("Only reviewers can be added as project members");
    }
    const { rows } = await query(
        `UPDATE projects
         SET members_id = array_append(members_id, $1)
         WHERE project_id = $2
         AND NOT ($1 = ANY(members_id))
         RETURNING *`,[user_id, project_id]
    );
    return rows[0] || null;
};

export const deleteProjectMembers = async (
    project_id: number,
    user_id: number
): Promise<Project | null> => {

    const { rows } = await query(
        `UPDATE projects
         SET members_id = array_remove(members_id, $1)
         WHERE project_id = $2
         RETURNING *`,
        [user_id, project_id]
    );

    return rows[0] || null;
};