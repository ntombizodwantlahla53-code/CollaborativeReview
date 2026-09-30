import { Request, Response } from "express";
import * as projectService from "./../service/projectService"

export const addProject = async (req: Request, res:Response) => {
    try {
        const newProject = await projectService.createProject(
            req.body);
        res.status(201).json(newProject);
    } catch (error) {
        res.status(500).json({ message: "Error in creating projects"});
    }
};

export const getAllprojects = async (req: Request, res: Response) => {
    try {
        const projects = await projectService.findAllProjects();
        res.status(200).json(projects);
    } catch (error) {
        res.status(500).json({ message: "Error retreiving applications"});

    }
};

export const getProjectById = async (req: Request, res: Response) => {
    try {
        const project_id = parseInt(req.params.id as string, 10)
        const project = await projectService.findProjectById(project_id)
        if(!project){
            return res.status(404).json({ message: "Project not found"})
        }
        return res.status(200).json(project)
    } catch (error) {
        res.status(500).json({message: "error retrieving project"})
    }
};

export const updateProjectById = async (req:Request, res:Response) =>{
    try{
        const project_id = parseInt(req.params.id as string, 10)
        const updateProject = await projectService.updateProject(project_id, req.body)
        if(!updateProject){
            return res.status(404).json({ message: "Projectn not found"})
        }
        res.status(200).json(updateProject);
    }catch (error){
       res.status(500).json({message: "error updating project"})
    }
};

export const deleteProjectById = async (req:Request, res: Response) =>{
    try{
      const project_id = parseInt(req.params.id as string, 10);
    const deleteProject = await projectService.deleteProject(project_id);
      if(!deleteProject){
            return res.status(404).json({ message: "Project not found"})
        }
        res.status(200).json({message: "Project Deleted Succesfully"});
    }catch (error){
        res.status(500).json({message: "error deleting project"})

    }
};