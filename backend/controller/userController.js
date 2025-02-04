import userModel from '../models/userModel.js';
import * as userUtility from '../utils/userUtility.js';
import { validationResult } from 'express-validator';
import redis from '../utils/redisUtility.js';

export const createUserController = async (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { email, password } = req.body;
        const user = await userUtility.createUser(email, password);
        const token = await user.generateJWT();
        delete user._doc.password;
        res.status(201).json({ user,token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const loginController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email }).select('+password');
        if (!user) {
            return res.status(404).json({ errors: 'User not found' });
        }
        const isValid = await user.isValidPassword(password);
        if (!isValid) {
            return res.status(401).json({ errors: 'Invalid credentials' });
        }
        const token = await user.generateJWT();
        delete user._doc.password;
        res.status(200).json({ user, token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
export const profileController = async (req, res) => {
    console.log(req.user);
    res.status(200).json({ user: req.user });
}
export const logoutController = async (req, res) => {
    try {
        const token = req.cookies.token || req.headers.authorization.split(' ')[1];
        await redis.set(token, 'logout', 'EX', 60 * 60 * 24);
        res.status(200).json({ message: 'Logout successful' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export const getAllUsersController = async (req, res) => {
    try {
        const loggedInUser = await userModel.findOne({ email: req.user.email });

        const allUsers = await userUtility.getAllUser({ userId: loggedInUser._id });
        return res.status(200).json({ users: allUsers });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
}