import { Router } from "express";
import authMiddleware from '../middlewares/auth.js';
import upload from "../config/multer.config.js";
import File from "../models/files.model.js";

const indexRoute = Router();

// Route for rendering the home page with user files
indexRoute.get('/home', authMiddleware, async (req, res) => {
    try {
        // Fetch files associated with the authenticated user
        const userFiles = await File.find({ user: req.user.userId });

        // Render the home page and pass the files to the template
        res.render('home.ejs', { files: userFiles });
    } catch (error) {
        console.error("Error fetching user files:", error);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
});

// Route for file upload
indexRoute.post('/upload-file', authMiddleware, upload.single('file'), async (req, res) => {
    try {
        // Check if file was uploaded
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded." });
        }

        console.log('User ID:', req.user.userId);

        // Create new file entry in the database
        const newFile = await File.create({
            path: req.file.path,
            originalName: req.file.originalname,
            user: req.user.userId // Ensure this field is set
        });

        // Respond with the new file details
        return res.status(201).json({ success: true, file: newFile });
    } catch (error) {
        console.error("File upload error:", error);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
});


indexRoute.get('/download/:path', authMiddleware, async (req, res) => {
    const loggedInUserId = req.user.userId;
    const path = req.params.path;
    const file = await File.findOne({
        user: loggedInUserId,
        path: path
    })
    if (!file) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
})

export default indexRoute;
