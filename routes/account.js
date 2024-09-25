var express = require('express');
var router = express.Router();
const Account = require('../models/Account')

//get all
router.get('/', async (req,res)=>{
    try{
        const account = await Account.find()
        res.json(account)
    }catch(err){
        res.status(500).json({message:err.message})
    }
})

//get one
router.route('/:id')
    .get(getAccount, (req,res)=>{
        res.json(res.account)
}) // update one
    .patch(getAccount,async (req,res)=>{
        if (req.body.Category != null){
            res.account.Category = req.body.Category
        }
        if (req.body.Date != null){
            res.account.Date = req.body.Date
        }
        if (req.body.Detail != null){
            res.account.Detail = req.body.Detail
        }
        if (req.body.Amount != null){
            res.account.Amount = req.body.Amount
        }
        if (req.body.SecondaryCategory != null){
            res.account.SecondaryCategory = req.body.SecondaryCategory
        }
        if (req.body.User_ID != null){
            res.account.User_ID = req.body.User_ID
        }
        try{
            const updated_Account = await res.account.save()
            res.json(updated_Account)
        }catch(err){
            res.status(400).json({message:err.message})
        }
}) //delete one
    .delete(getAccount,async (req,res)=>{
        try{
            await res.account.deleteOne()
            res.json({message:'account removed'})
        }catch(err){
            res.status(400).json({message:err.message})
        }
})
//create
router.post('/', async(req,res)=>{
    const acc = new Account({
        Category : req.body.Category,
        Date : req.body.Date,
        Detail : req.body.Detail,
        Amount : req.body.Amount,
        SecondaryCategory : req.body.SecondaryCategory,
        User_ID : req.body.User_ID,
    })
    try{
        const new_account = await acc.save()
        res.status(201).json(new_account)
    }catch(err){
        console.log(err);
        res.status(400).json({message:err.message})
    }
})

//middleware getid
async function getAccount (req,res,next){
    let account
    try{
        account = await Account.findById(req.params.id)
        if (account == null){
            return res.status(404).json({message : 'account not found'})
        }
    }catch(err){
        res.status(500).json({message:err.message})
    }
    res.account = account
    next()
}

module.exports = router;