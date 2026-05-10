const express = require('express');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors()); // Allows your separate website to talk to this API

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Configure Storage Engine
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'uploads',
        resource_type: 'auto', // Auto-detects image vs video
    },
});

const upload = multer({ storage: storage });

// The Upload Route
app.post('/upload', upload.single('file'), (req, res) => {
    try {
        // req.file.path is the permanent URL you need for your <img> or <video> tags
        res.json({ 
            message: "Upload successful!",
            url: req.file.path 
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));