import {Router} from 'express';
import * as userController from '../controller/userController.js';
import {body} from 'express-validator';
import * as authMiddleware from '../middlewares/auth.middleware.js';
const userRouter = Router();

userRouter.post('/register', 
    
    body('email').isEmail().withMessage('Email is required'),
    body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    
    userController.createUserController);
userRouter.post('/login', userController.loginController);

userRouter.get('/profile',authMiddleware.authUserMiddleware, userController.profileController);
    
userRouter.get('/logout',authMiddleware.authUserMiddleware, userController.logoutController);

userRouter.get('/all',authMiddleware.authUserMiddleware, userController.getAllUsersController);

export default userRouter;
