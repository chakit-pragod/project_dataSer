const mongoose = require('mongoose');

const announceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true }, // Path or URL of the image
}, {timestamps:true});

const Announcement = mongoose.model('Announcement', announceSchema);

module.exports = Announcement;