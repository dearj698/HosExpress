var jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
require('../models/User')
const User = mongoose.model('user')


module.exports = {
    ensureAuthenticated: function(req, res, next){
        let token = req.headers.token;
        jwt.verify(token, 'HosPitality', (err, decoded)=>{
            if(err) throw err
            console.log("decoded"+JSON.stringify(decoded));
            return next();
        })
    }
}