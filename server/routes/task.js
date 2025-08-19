const mongoose = require('mongoose')
const express = require('express')
const { task } = require('../models/task')
const router = express.Router()

router.get('/' ,async(req,res)=>{
    try{
        const tasklist = await task.find()
       .populate('name', 'name');  
       if(!tasklist){
        return res.status(500).json({success:false})
       }
       res.send(tasklist)
    }catch(error){
        res.status(500).json({success:false,error:error.message})
    }
})

router.post('/create' ,async (req,res) =>{
    try{
        let Task = new task({
            title:req.body.title,
            name:req.body.name,
            duedate:req.body.duedate,
            details:req.body.details,
            status:req.body.status
        });
        console.log(Task);

        Task = await Task.save();
        if(!Task){
            return res.status(500).json({
                error:"Error Saving task",
                success:false
            })
        }
        res.status(201).json(Task)
    }catch(error){
        console.error(error);
        res.status(500).json({error:error.message})
    }
})

router.get('/:id' ,async(req,res)=>{
   const Task = await task.findById(req.params.id).populate('name', 'name');  
   if(!Task){
    res.status(500).json({message:'the task given id was not found.'})
   }
   return res.status(200).send(Task)
})

router.get('/taske/:id', async(req,res)=>{
    const empid = req.params.id;
    const taskemplist = await task.find({ "name": empid }).populate('name', 'name');  
    if(!taskemplist){
      res.status(500).json({message:'the emp id given this is not the task.'})
    }
    return res.status(200).send(taskemplist)
})

router.delete('/:id', async(req,res)=>{
    const deletetask = await task.findByIdAndDelete(req.params.id);
    if(!deletetask){
      return res.status(404).json({
        message:"task does not found!",
        status:false
      })
    }
    res.status(200).send({
      message:"task is deleted!",
      status:true
    })
})

router.delete("/delete/:id", async (req, res) => {
  try {
    const empid = req.params.id; 

    const deletedData = await task.deleteMany({ "name": empid });

    if (deletedData.deletedCount === 0) {
      return res.status(404).json({
        message: "No task data found for this employee!",
        Status: false
      });
    }

    res.status(200).json({
      message: "task deleted successfully!",
      Status: true
    });

  } catch (error) {
    res.status(500).json({
      message: "Error deleting task data",
      error: error.message,
      Status: false
    });
  }
});

router.put('/:id', async(req,res)=>{
  const  Task = await task.findByIdAndUpdate(
    req.params.id,{
     title:req.body.title,
            name:req.body.name,
            duedate:req.body.duedate,
            details:req.body.details,
            status:req.body.status
    },
    {new:true}
  );

  if(!Task){
    res.status(404).json({
      message:'this is can not update',
      status:false
    })
  }
  res.status(200).json({
    message:'task is update',
    status:true
  })
})

module.exports = router;