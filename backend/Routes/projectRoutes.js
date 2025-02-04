import { Router } from "express";
import {body} from 'express-validator';
const projectRouter = Router();
import * as projectController from '../controller/projectController.js';
import * as authMiddleware  from "../middlewares/auth.middleware.js";

projectRouter.post('/create',authMiddleware.authUserMiddleware, body('name').isLength({ min: 1 }).withMessage('Name is required'), projectController.createProject);

projectRouter.get('/all',authMiddleware.authUserMiddleware, projectController.getProjects);

projectRouter.put('/add-user',authMiddleware.authUserMiddleware, body('projectId').isString().withMessage('Project ID is required'),body('users').isArray({min:1}).withMessage('User must be an array of strings').bail().custom((users)=> users.every(user=> typeof user ==='string')).withMessage('Each user must be of type string')  , projectController.addUserToProject);

projectRouter.get('/get-project/:projectId',authMiddleware.authUserMiddleware, projectController.getProjectById);

projectRouter.put('/update-file-tree',authMiddleware.authUserMiddleware, body('projectId').isString().withMessage('Project ID is required'),body('fileTree').isObject().withMessage('File tree must be an object'), projectController.updateFileTree);
export default projectRouter;