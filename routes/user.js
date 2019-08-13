const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


require('../models/User')
const User = mongoose.model('user')


  //getUserById
  router.get('/getUserById/:id', (req, res)=>{
    res.send('get id: '+req.params.id)
})
// insert user
router.post('/register', (req, res)=>{
    let newuser = new User({
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        email:req.body.email,
        password:req.body.password,
        token: "token"
    })
    var token = jwt.sign({
        lastname: req.body.lastname,
        firstname: req.body.firstname,
        email:req.body.email,
        password:req.body.password,
    }, 'HosPitality');
    newuser.token = token;
    console.log(req.body)

    bcrypt.genSalt(10, (err, salt)=> {
        bcrypt.hash(newuser.password, salt, (err, hash)=> {
                newuser.password = hash
                newuser.save().then( user => {
                    console.log('User: ' + newuser.firstname + ' ' + newuser.lastname + ' has been added to the database' )
                    res.send(newuser)
                }).catch((err) => {
                    console.log("err happens when saving users to database : " + err)
                  })
        })
    })
})


module.exports = router