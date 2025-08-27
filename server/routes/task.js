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
      await Task.populate("name", "name"); 

const io = req.app.get("socketio");
const empName = Task.name.name; 

io.to(empName).emit("taskassinged", {
  message: "📢 You Given New Task !",
  data: Task,
});

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

router.get('/taske/:name', async (req, res) => {
  try {
    const empname = req.params.name;

    const taskemplist = await task.find()
      .populate({
        path: 'name',
        select: 'name', 
        match: { name: empname }
      });

    const filteredTasks = taskemplist.filter(t => t.name !== null);

    if (filteredTasks.length === 0) {
      return res.status(404).json({ message: 'No tasks found for this employee!' });
    }

    return res.status(200).send(filteredTasks);

  } catch (error) {
    res.status(500).json({
      message: "Error fetching tasks",
      error: error.message,
    });
  }
});



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