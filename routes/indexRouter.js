import { Router } from "express";
import authMiddleware from '../middlewares/auth.js';
import upload from "../config/multer.config.js";
import File from "../models/files.model.js";
import Firebase from "../config/firebase.config.js";

const indexRoute = Router();

// Route for rendering the home page with user files
indexRoute.get('/home', authMiddleware, async (req, res) => {
    try {
        const userFiles = await File.find({ user: req.user.userId });
        res.render('home.ejs', { files: userFiles });
    } catch (error) {
        console.error("Error fetching user files:", error);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
});

// Route for file upload
indexRoute.post('/upload-file', authMiddleware, upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded." });
        }

        console.log('User ID:', req.user.userId);

        const newFile = await File.create({
            path: req.file.path,
            originalName: req.file.originalname,
            user: req.user.userId
        });

        return res.status(201).json({ success: true, file: newFile });
    } catch (error) {
        console.error("File upload error:", error);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
});

// Route for downloading a file
indexRoute.get('/download/:path', authMiddleware, async (req, res) => {
    const loggedInUserId = req.user.userId;
    const path = req.params.path;

    try {
        const file = await File.findOne({ user: loggedInUserId, path: path });

        if (!file) {
            return res.status(404).json({ success: false, message: "File not found." });
        }

        const signedUrl = await Firebase.storage().bucket().file(path).getSignedUrl({
            action: 'read',
            expires: Date.now() + 15 * 60 * 1000 // Expires in 15 minutes
        });

        return res.redirect(signedUrl[0]);
    } catch (error) {
        console.error("Error fetching download URL:", error);
        return res.status(500).json({ success: false, message: "Internal server error." });
    }
});

export default indexRoute;
