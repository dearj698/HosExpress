var mongo = require("mongodb");
const assert = require("assert");
const MongoClient = mongo.MongoClient;
const host = "localhost";
const port = "27017";
const Urls = "mongodb://localhost:27017";
var database = "admin";
// adds data
var adds = function(db,collections,selector,fn){
    var collection = db.collection(collections);
    collection.insertMany([selector],function(err,result){
        try{assert.equal(err,null)}catch(e){
            console.log(e);
          }
      fn(result);
    });
  }

//deletes
var deletes = function(db,collections,selector,fn){
    var collection = db.collection(collections);
    collection.deleteMany(selector,function(err,result){
      try{assert.equal(err,null)}catch(e){
        console.log(e);
      }
      fn(result); 
    });
  
  };


//find
var find = function(db,collections,selector,fn){
    var collection = db.collection(collections);
      collection.find(selector).toArray(function(err,docs){
        try{
          assert.equal(err,null);
        }catch(e){
          console.log(e);
          docs = [];
        }
        fn(docs);
      });
  }

//update
var updates = function(db,collections,selector,fn){
    var collection = db.collection(collections);
    console.log(selector);
    collection.updateMany(selector[0],selector[1],function(err,result){
        try{assert.equal(err,null)}catch(e){
            console.log(e);
          }
      fn(result);
    });
  
  }

  var methodType = {
        login:find,
        show:find,
        add:adds,
        update:updates,
        delete:deletes,
        adduser:adds,
        usershow:find,
        getcategory:find,
        find:find,
        AddDirectory:find,
        updateDirectory:updates,
        deleteDirectory:deletes,
        showlist:find,
        showdir:find
  };

  module.exports = function(req,collections,selector,fn){
    MongoClient.connect(Urls,{useNewUrlParser: true,useUnifiedTopology: true},function(err, client) {
        var db = client.db(database);
        try{assert.equal(err,null)}catch(e){
            console.log(e);
          }
        console.log("Connected correctly to server");
        methodType[req](db,collections,selector,fn);
        client.close();
    });
  };