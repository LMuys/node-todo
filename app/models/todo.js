var mongoose = require('mongoose');

var TodoSchema =  new mongoose.Schema({
   text : {type : String, default: ''},
   done : {type : Boolean, default : false},
   snoozed : {type : Boolean, default : false}
});

module.exports = mongoose.model('Todo', TodoSchema);
