const express = require('express');
const multer = require('multer');
const Announcement = require('../models/announce');

const router = express.Router();

// Multer config for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/images/');  // Ensure this folder exists
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

const upload = multer({ storage: storage });

// Route to create new announcement
router.post('/announce', upload.single('image'), async (req, res) => {
  try {
    const { title, description } = req.body;
    const imagePath = req.file ? req.file.path : null;

    const newAnnouncement = new Announcement({
      title,
      description,
      image: imagePath
    });

    await newAnnouncement.save();
    res.redirect('admin/announce');  // Redirect to home after success
  } catch (error) {
    res.status(500).json({ error: 'Failed to create announcement' });
  }
});

// Route to fetch all announcements
router.get('/announcements', async (req, res) => {
    try {
      const announcements = await Announcement.find();  // Fetch all announcements from the database
      res.json(announcements);  // Send announcements as JSON
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
});

module.exports = router;
