var mongoose = require('mongoose');

var EventsSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },

    data: {
        type: String,
        required: true
    },

    time:{
        type:String,
        required: true
    }
});


var Events = mongoose.model('Events', EventsSchema);

module.exports =Events;