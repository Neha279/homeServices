'use strict';
var csv = require('fast-csv');
var mongoose = require('mongoose');
var MongoClient = require('mongodb').MongoClient;
var clientOrder = require('./data.js');
var url = "mongodb://localhost:27017";

 
exports.updateCsvToDB = function (csvdata) {
 
    var clientOrder = [];
         
    csv
     .fromString(csvdata.toString(), {
         headers: true,
         ignoreEmpty: true
     })
     .on("data", function(data){
         data['_id'] = new mongoose.Types.ObjectId();
         clientOrder.push(data);
     })
     .on("end", function(){
        MongoClient.connect(url, function(err, database) {
          if (err) throw err;
          console.log("Database connected!");
          let db = database.db('orderClient');
          db.collection("clientOrder").insertMany(clientOrder, function(err, res) {
            if (err) throw err;
            console.log("Number of documents inserted: " + res.insertedCount);
            database.close();
          });
         
        });
         return (clientOrder.length + ' Order  have been successfully uploaded.');
     });
};