'use strict';
var mongoose = require('mongoose');
 
var dataSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    orderId: String,
    client: {
        clientId: {
        type: String,
        required: true,  
        validate: {
            validator: function(text) {
                if (text == null && text.length == 0)
                    return false;
                 
                return true;
            },
            message: 'Order must contain client Id..'
          }
        },
        firstName: {
            type: String,
            required: true
        },
        lastName: String
     } ,
    duration: Number,
    request: String  
});
 
var OrderClient = mongoose.model('OrderClient', dataSchema);
 
module.exports = OrderClient;