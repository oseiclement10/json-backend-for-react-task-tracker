const express = require('express');
const router = express.Router();
const Task = require('../models/Task');

router.get('/',(req,res)=>{
    Task.find({},(err,data)=>{
        if(err){
            console.log(err);
        }else{
            res.status(200).json(data);
        }
    });
});

router.post('/newpost',(req,res)=>{
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
            res.status(200).json({status:200,msg:"Processed"});
        }
    })
})



module.exports = router;