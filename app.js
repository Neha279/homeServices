var express = require('express');
var app = express();
var mongoose = require('mongoose');
var fs = require('fs');
var butlerCtr = require('./api/butlerController.js');
var cornjob = require('./batch/cornjob.js');

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/orderClient');
// route pages
app.get('/', function (req, res) {
  res.send('Main page is up and running!');
});

app.post('/butler', function (req, res) {
  console.log("APP BODY " , req.body);
  var response  = butlerCtr.allocateAndReport(req);
  res.send(response);
});

app.get('/getCsv', (req, res) => { 
	res.setHeader('Content-disposition', 'attachment; filename=testing.csv');
    res.set('Content-Type', 'text/csv');
	res.sendFile(__dirname + '/clientOrder.csv') 
});

// what port to run server on
app.listen(3001, function () {
  console.log('server started on port 3001');
});