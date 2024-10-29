import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import userModel from '../models/user.model.js';

export const createUser = async (req, res) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { username, email, password } = req.body;
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await userModel.create({ username, email, password: hashedPassword });
        if (!user) {
            return res.status(400).json({ message: 'Failed to create user' });
        }

        return res.status(201).json({ success: true, message: "User created successfully", user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error!" });
    }
};

export const loginUser = async (req, res) => {
    try {
        const { username, password } = req.body;
        const isUser = await userModel.findOne({ username });
        if (!isUser) {
            return res.status(400).json({ success: false, message: "Invalid username or password!" });
        }

        const isValidPassword = await bcrypt.compare(password, isUser.password);
        if (!isValidPassword) {
            return res.status(400).json({ success: false, message: "Invalid username or password" });
        }

        const token = jwt.sign(
            { id: isUser._id, username: isUser.username, email: isUser.email },
            process.env.SECRET_KEY,
            { expiresIn: '1h' }
        );

        res.cookie('token', token, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
        return res.status(200).json({ success: true, message: "Logged in successfully", user: isUser });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error!" });
    }
};
