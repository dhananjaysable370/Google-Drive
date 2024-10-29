import { Router } from "express";
import file from "../models/files.model.js";
import authMiddleware from '../middlewares/auth.js';
import upload from "../config/multer.config.js";

const indexRoute = Router();

indexRoute.get('/home', authMiddleware, (req, res) => {
    res.render('home.ejs');
});

indexRoute.post('/upload-file', authMiddleware, upload.single('file'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ success: false, message: "No file uploaded." });
        }

        console.log('User ID:', req.user.userId);

        const newFile = await file.create({
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

export default indexRoute;
