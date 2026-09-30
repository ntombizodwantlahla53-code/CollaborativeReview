// import { Request, Response } from "express";
// import * as projectMembersService from "../service/projectMembersService"

// export const addProjectMembers = async (req: Request, res:Response) => {
//     try{
//             if (!req.user) {
//             return res.status(401).json({ message: "jnn" });
//         }
//             const project_id = parseInt(req.params.project_id as string, 10)
//             const AddProjectMembers = await projectMembersService.AddProjectMembers(project_id, req.body)

//             if(!AddProjectMembers){
//                 return res.status(404).json({ message: "Projectn not found"})
//             }
//             res.status(200).json(AddProjectMembers);
//         }catch (error){
//            res.status(500).json({message: "error updating project"})
//         }
// };


// export const deleteProjectMembers= async (req:Request, res: Response) =>{
//     try{
//         if (!req.user) {
//         return res.status(401).json({ message: "jnn" });
//     }
//       const project_id = parseInt(req.params.project_id as string, 10);
//       const user_id = parseInt(req.params.project_id as string, 10);
//     const deleteProjectMembers = await projectMembersService.deleteProjectMembers(
//         project_id, user_id);

//       if(!deleteProjectMembers){
//             return res.status(404).json({ message: "Project not found"})
//         }
//         res.status(200).json({message: "Project Deleted Succesfully"});
//     }catch (error){
//         res.status(500).json({message: "error deleting project"})

//     }
// };