import mongoose, { mongo } from "mongoose";
import Project from "../models/projectModel.js";

export const createProject = async (name,userId) => {
    if (!name) {
        throw new Error('Name is required');
    }
    if (!userId) {
        throw new Error('User ID is required');
    }
    let project;
    try {
        project = await Project.create({ name, users: [userId] });
    } catch (error) {
        if (error.code === 11000) { // Duplicate key error code for MongoDB
            throw new Error('Project name already exists');
        }
        throw error;
    }
    return project;
}

export const getAllProjectsByUserId = async ({userId}) => {
    if (!userId) {
        throw new Error('User ID is required');
    }
    return await Project.find({ users: userId });
}

export const addUserToProject = async ({projectId, users, userId}) => {
    if(!projectId){
        throw new Error('Project ID is required');
    }
    if(!userId){
        throw new Error('User ID is required');
    }
    
    if(!mongoose.Types.ObjectId.isValid(userId)){
        throw new Error('Invalid user ID');
    }
    if(!mongoose.Types.ObjectId.isValid(projectId)){
        throw new Error('Invalid Project ID');
    }
    if(!users || users.length === 0){
        throw new Error('User is required');
    }
    if(!Array.isArray(users)|| users.some(userId=> !mongoose.Types.ObjectId.isValid(userId))){
        throw new Error('Invalid User ID in users array');
    }

    const project = await Project.findOne({ _id: projectId, users: userId });
    if (!project) {
        throw new Error('User is not authorized to add users to this project');
    }

    const updatedProject = await Project.findOneAndUpdate({_id: projectId}, 
        { $addToSet:
             { users: { $each: users } } }, { new: true });
             return updatedProject;
        }

export const getProjectById = async ({projectId}) => {
    if (!projectId) {
        throw new Error('Project ID is required');
    }
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error('Invalid Project ID');
    }
    const project = await Project.findOne({ _id: projectId }).populate('users');
    return project;
}        

export const updateFileTree = async ({projectId, fileTree}) => {
    if (!projectId) {
        throw new Error('Project ID is required');
    }
    if (!fileTree) {
        throw new Error('File tree is required');
    }
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
        throw new Error('Invalid Project ID');
    }
    const updatedProject = await Project.findOneAndUpdate({ _id: projectId }, { fileTree }, { new: true });
    return updatedProject;
}
    