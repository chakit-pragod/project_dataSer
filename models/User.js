const mongoose = require('mongoose')

const schema = mongoose.Schema
const User_schema = new schema({
    ID:{
        type: Int32Array,
        required : true
    },
    Username:{
        type: String,
        required : true
    },
    Password:{
        type: String,
        required : true
    },
    Email:{
        type: String,
        required : true
    },
},{timestamps: true})

module.exports = mongoose.model('user',User_schema)