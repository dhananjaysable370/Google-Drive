import userModel from '../models/user.model.js';
import bcrypt from 'bcrypt'

export const createUser = async (req, res) => {
    try {
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
        res.status(200).json({ success: true, message: "User created successfully", user });
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error!" });
    }
}