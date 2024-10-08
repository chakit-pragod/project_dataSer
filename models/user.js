const mongoose = require('mongoose')

// User schema
const UserSchema = new mongoose.Schema({
    usertype: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }
}, {timestamps:true});

const User = mongoose.model('User', UserSchema);

module.exports = User || mongoose.model.User