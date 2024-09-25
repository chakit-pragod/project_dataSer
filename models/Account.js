const mongoose = require('mongoose')

const schema = mongoose.Schema
const Account_schema = new schema({
    Category:{
        type: Number,
        required : true
    },
    Date:{
        type: Date,
        required: true
    },
    Detail:{
        type: String,
        required : true,
        default : ''
    },
    Amount:{
        type: Number,
        required : true,
        default : 0
    },
    SecondaryCategory:{
        type: Number,
        required : true
    },
    User_ID:{
        type: Number,
        required : true
    },
},{timestamps: true})

module.exports = mongoose.model('account',Account_schema)