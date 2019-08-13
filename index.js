const express = require('express')
const  mongoose  = require('mongoose')
const passport = require('passport')
const session = require('express-session');
const bodyParser = require('body-parser');
const app = express()

//get rid of warning 
mongoose.Promise = global.Promise;
//connect to mongodb
// Connect to mongoose
mongoose.connect('mongodb+srv://root:613387@cluster0-fhku0.azure.mongodb.net/test?retryWrites=true&w=majority')
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Express session midleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
  }));
  app.use(passport.initialize());
  app.use(passport.session());

  
const user = require('./routes/user');

app.use('/user',user);


const port = process.env.PORT || 5000;

app.listen(port, () =>{
  console.log(`Server started on port ${port}`);
});