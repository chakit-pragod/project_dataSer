const mongoose = require('mongoose');

// Define a schema for transactions
const transactionSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    item: { type: String, required: true },
    amount: { type: Number, required: true },
    type: { type: String, enum: ['income', 'expense'], required: true },
    category: { type: String, required: true },
    //user_ID: {type : mongoose.Schema.Types.ObjectId , ref : 'users'}
}, {timestamps:true});

// Create a model from the schema
const Transaction = mongoose.model('Transaction', transactionSchema);

module.exports = Transaction;