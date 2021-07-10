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
router.patch('/:id',(req,res)=>{
    Task.findById(req.params.id,(err,data)=>{
      if(err){
          console.log(err);
          res.status(404).json('data not found');
      }else{
        let reminder = data.reminder;  
        let query = {
            _id:req.params.id
           }
          let update ={
            reminder:!reminder,
            toString(){
                return this.reminder;
            }
          }
        Task.updateOne(query,update,(err)=>{
            if(err){
                console.log(err);
                res.status(500).json({msg:"internal server error"});
            }else{
                res.status(200).json({msg:"updated reminder successfully"});
            }
        });
         
      }
  });

  

})

router.delete('/:id',(req,res)=>{
    let query = {
        _id:req.params.id
    };
    Task.deleteOne(query,(err)=>{
        if(err){
            console.log("error occured");
            console.log(err);
            res.status(404).json({
                msg:" Error occured could not delete "});
        }else{
            res.status(200).json({msg:"deletion succeded"});
        }
    }
);
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
