var express = require('express');
var router = express.Router();
const Transaction = require('../models/transaction')

//get all
router.get('/', async (req,res)=>{
    try{
        const blogs = await Transaction.find()
        //res.json(transaction)
        res.render('transaction',{blogs});
    }catch(err){
        console.error(err);
        res.status(500).json({message:err.message})
    }
})
//get one
router.route('/:id')
    .get(getTransaction, (req,res)=>{
        res.json(res.transaction)
}) // update one
    .patch(getTransaction,async (req,res)=>{
        if (req.body.date != null){
            res.transaction.date = req.body.date
        }
        if (req.body.item != null){
            res.transaction.item = req.body.item
        }
        if (req.body.amount != null){
            res.transaction.amount = req.body.amount
        }
        if (req.body.type != null){
            res.transaction.type = req.body.type
        }
        if (req.body.category != null){
            res.transaction.category = req.body.category
        }
        // if (req.body.user_ID != null){
        //     res.transaction.user_ID = req.body.user_ID
        // }
        try{
            const updated_transaction = await res.transaction.save()
            res.json(updated_transaction)
        }catch(err){
            res.status(400).json({message:err.message})
        }
}) //delete one
    .delete(getTransaction,async (req,res)=>{
        try{
            await res.transaction.deleteOne()
            //res.json({message:'transaction removed'})
            res.redirect('/users/table');
        }catch(err){
            res.status(400).json({message:err.message})
        }
})
//create
router.post('/', async(req,res)=>{
    const acc = new Transaction({
        date : req.body.date,
        item : req.body.item,
        amount : req.body.amount,
        type : req.body.type,
        category : req.body.category,
        user_ID : req.session.user_id
    })
    try{
        const new_transaction = await acc.save()
        //res.status(201).json(new_transaction)
        res.status(201).redirect('/users/table');
    }catch(err){
        console.log(err);
        res.status(400).json({message:err.message})
    }
})

//middleware getid
async function getTransaction (req,res,next){
    let transaction
    try{
        transaction = await Transaction.findById(req.params.id)
        if (transaction == null){
            return res.status(404).json({message : 'transaction not found'})
        }
    }catch(err){
        res.status(500).json({message:err.message})
    }
    res.transaction = transaction
    next()
}

module.exports = router;