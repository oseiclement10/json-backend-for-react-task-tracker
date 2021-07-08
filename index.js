const express = require('express');
const app = express();
const port = 5000;
const config = require('./config/database');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
mongoose.connect(config.database,{useNewUrlParser:true,useUnifiedTopology:true});
const db = mongoose.connection;
db.once('open',()=>console.log('connected to mongo db successfully'));
db.on('error',error=>console.log('error occured at ' + error));
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());
const Task = require('./models/Task');

app.get('/',function(req,res){
    Task.find({},function(err,data){
        console.log(data);
        if(err){
            console.log(err);
        }else{
            res.json(data);
        }
    })     
})
app.post('/posts/',(req,res)=>{
    console.log(req.body);
    let newTask = new Task();
    newTask.title = req.body.title;
    newTask.date = req.body.date;
    newTask.reminder = req.body.reminder;
    console.log(newTask);
    newTask.save((err)=>{
        if(err){
            console.log(err);
        }else{
            res.send("processed");
        }
    })
    
})
app.listen(port,()=>console.log('server started on port ' + port));
