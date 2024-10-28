const userModel = require('../models/user.model')

export const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await userModel.findOne({ email });
        if (existingUser) { 
            return res.status(400).json({ message: 'Email already exists' });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
    } catch (error) {
        res.status(500).json({ success: false, message: "Internal Server Error!" });
    }
}