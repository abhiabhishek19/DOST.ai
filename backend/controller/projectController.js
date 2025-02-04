import Project from "../models/projectModel.js";
import * as projectUtility from "../utils/projectUtility.js";
import {validationResult} from 'express-validator';
import User from "../models/userModel.js";

export const createProject = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
    const { name } = req.body;
    const loggedInUser = await User.findOne({email: req.user.email});
    const userId = loggedInUser._id;
    const newProject = await projectUtility.createProject(name, userId);
    res.status(201).json({ project: newProject });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}
 
export const getProjects = async (req, res) => {
    try {
        const loggedInUser = await User.findOne({email: req.user.email});
        const userId = loggedInUser._id;
        const getalluserprojects = await projectUtility.getAllProjectsByUserId({userId});
        res.status(200).json({ projects: getalluserprojects });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const addUserToProject = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { users, projectId } = req.body;
        const loggedInUser = await User.findOne({email: req.user.email});
        const project = await projectUtility.addUserToProject({projectId, users, userId:loggedInUser._id});
        res.status(200).json({ project, });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getProjectById = async (req, res) => {
    try {
        const { projectId } = req.params;
        const project = await projectUtility.getProjectById({projectId});
        return res.status(200).json({ project });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const updateFileTree = async (req, res) => {
    try {
        const { projectId, fileTree } = req.body;
        const project = await projectUtility.updateFileTree({projectId, fileTree});
        return res.status(200).json({ project });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}