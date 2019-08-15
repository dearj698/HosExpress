const express = require('express');
require('dotenv').config()
const mongoose = require('mongoose');
const router = express.Router();


require('../models/UserCase')
const UserCase = mongoose.model('usercase')
const { ensureAuthenticated } = require('../auth/auth');

router.post('/bookcase' , ensureAuthenticated, (req, res) => {
    console.log(req.body)
    let newcase = new UserCase({
        date: req.body.date,
        operationType: req.body.operationType,
        period: req.body.period,
        name: req.body.name,
        priority: req.body.period,
        equipment: req.body.equipment,
        anatheria: req.body.anatheria 
    })
    newcase.save().then(
        usercase=>{
            res.send({"newcase":usercase})
        }
    ).catch(err=>{
        res.send({'error': err})
    })
})

router.get('/getcases', ensureAuthenticated, (req, res) =>{
    UserCase.find({}).then((usercase, err)=>{
        if(err) throw err
        else{
            res.send(usercase)
        }
    }).catch(err=>{
        res.send({'error': err})
    })
    
})

module.exports = router