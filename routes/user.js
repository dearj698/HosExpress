const express = require('express');
require('dotenv').config()
const mongoose = require('mongoose');
const router = express.Router();
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');


require('../models/User')
const User = mongoose.model('user')
const { ensureAuthenticated } = require('../auth/auth');


  router.get('/getUsers',ensureAuthenticated, (req, res)=>{
      User.find({}).then((users , err)=>{
          if(err) throw err
          else{
              res.send(users)
          }
      }).catch(err=>{
        res.send(err)
    })
  })
  //getUserByEmail
  router.get('/getUserByEmail/:email',ensureAuthenticated, (req, res)=>{
      User.findOne({email: req.params.email}).then((user,err)=>{
          if(err) throw err;
          if(!user){
              res.send("user not exist")
          }
          else{
            res.send(user);
          }
      }).catch(err=>{
          res.send(err)
      })
})
//login
router.post('/login', (req, res) =>{
    User.findOne({email: req.body.email}).then((user, err)=>{
        if(!user){
            res.send('no user found')
        }
        else{
            let pwd_check  = bcrypt.compareSync(req.body.password, user.password)
            console.log('checked pwd: '+pwd_check);
            if(pwd_check){
                res.send('success');
            }
            else{
                res.send('password do not match')
            }
        }
    })
})
// insert user
router.post('/register', (req, res)=>{
    User.findOne({email: req.body.email}).then((user, err)=> {
        if(user){
            res.send("registered")
        }
        else{
            let newuser = new User({
                lastname: req.body.lastname,
                firstname: req.body.firstname,
                email:req.body.email,
                password:req.body.password,
                token: "token"
            })
            var token = jwt.sign({
                email:req.body.email,
            }, process.env.TOKEN_SECRET);
        
            newuser.token = token;
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
        }
    })
})


module.exports = router