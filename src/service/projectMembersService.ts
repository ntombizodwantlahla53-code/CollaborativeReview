// import { query } from "../config/database";
// import { Project, NewProject } from "../types/project.types";

// export const AddProjectMembers = async (
//     project_id: number,
//     user_id:number 
// ): Promise<Project | null> => {
//     const { rows } = await query (
//         `UPDATE projects
//         SET members_id = array_append(members_id, $1)
//         WHERE id = $2
//         RETURNING *`,
//         [project_id, user_id]
//     );
//     return rows[0] || null;
// };



// export const deleteProjectMembers = async (
//     project_id: number,
//     user_id:number 
// ): Promise<Project | null> => {
//     const { rows } = await query (
//         `UPDATE projects
//         SET members_id = array_append(members_id, $1)
//         WHERE id = $2
//         RETURNING *`,
//         [project_id, user_id]
//     );
//     return rows[0] || null;
// };