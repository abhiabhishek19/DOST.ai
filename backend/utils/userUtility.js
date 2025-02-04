import userModel from '../models/userModel.js';

export const createUser = async (email, password) => {
    if (!email || !password) {
        throw new Error('Email and password are required');
    }
    const hashedPassword = await userModel.hashPassword(password);
    return await userModel.create({ email, password: hashedPassword });
}

export const getAllUser = async ({userId}) => {
    return await userModel.find({
        _id: { $ne: userId }
    },
    );
}