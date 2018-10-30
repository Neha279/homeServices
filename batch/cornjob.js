'use strict';
const schedule = require('node-schedule');
const csvUpload = require('../db/update.js');
var request = require('request');


var corn = schedule.scheduleJob('0 */1 * * * *', function() { /* in 1 min*/
    console.log('scheduler ');
   request.get('http://127.0.0.1:3001/getCsv', function (error, response, body) {
    if (!error && response.statusCode == 200) {
        console.log('csv=' , body);
        console.log(csvUpload.updateCsvToDB(body));
       }
   });
 });