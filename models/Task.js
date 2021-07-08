const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    reminder:{
        type:Boolean,
        required:true,
    }
});

let Tasks = module.exports = mongoose.model('Tasks',taskSchema);