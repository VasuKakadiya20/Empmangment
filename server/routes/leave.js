const mongoose = require("mongoose");
const express = require('express')
const { leave } = require('../models/leave')
const router = express.Router()

router.get('/' , async (req,res)=>{
    try{
        const leavelist = await leave.find()
        if(!leavelist){
            return res.status(500).json({success:false})
        }
        res.send(leavelist);
    }catch(error){
       res.status(500).json({ success: false, error: error.message });
    }
})

router.post('/create' ,async (req,res)=>{
    try{
        let Leave = new leave({
           name:req.body.name,
           leavetype:req.body.leavetype,
           leaveFrom:req.body.leaveFrom,
           leaveTo:req.body.leaveTo,
           Numberofdays:req.body.Numberofdays,
           Status:req.body.Status,
           Reason:req.body.Reason,
           RequestedOn:req.body.RequestedOn,
           ApprovedBy:req.body.ApprovedBy,
           ApprovedDate:req.body.ApprovedDate,
        });
        console.log(Leave);

        Leave = await Leave.save();
        if(!Leave){
            return res.status(500).json({
                error:"Error Saving leave",
                success:false
            })
        }
        res.status(201).json(Leave);
    }catch (err){
        console.error(err)
        res.status(500).json({error:err.message})
    }
})

router.get('/:id' ,async(req,res)=>{
  const Leave = await leave.findById(req.params.id);
  if(!Leave){
    res.status(500).json({message:'the Leave given id was not found.'})
  }
  return res.status(200).send(Leave);
})

router.delete('/:id', async(req,res)=>{
    const deleteleave = await leave.findByIdAndDelete(req.params.id);
    if(!deleteleave){
      return res.status(404).json({
        message:"Leave does not found!",
        status:false
      })
    }
    res.status(200).send({
      message:"Leave is deleted!",
      status:true
    })
})

// router.delete("/delete/:id", async (req, res) => {
//   try {
//     const empid = req.params.id; 

//     const deletedData = await leave.deleteMany({ "name": empid });

//     if (deletedData.deletedCount === 0) {
//       return res.status(404).json({
//         message: "No leave data found for this employee!",
//         Status: false
//       });
//     }

//     res.status(200).json({
//       message: "leave deleted successfully!",
//       Status: true
//     });

//   } catch (error) {
//     res.status(500).json({
//       message: "Error deleting Leave",
//       error: error.message,
//       Status: false
//     });
//   }
// });

router.put('/:id', async(req,res)=>{
  const  Leave = await leave.findByIdAndUpdate(
    req.params.id,{
       name:req.body.name,
           leavetype:req.body.leavetype,
           leaveFrom:req.body.leaveFrom,
           leaveTo:req.body.leaveTo,
           Numberofdays:req.body.Numberofdays,
           Status:req.body.Status,
           Reason:req.body.Reason,
           RequestedOn:req.body.RequestedOn,
           ApprovedBy:req.body.ApprovedBy,
           ApprovedDate:req.body.ApprovedDate,
    },
    {new:true}
  );

  if(!Leave){
    res.status(404).json({
      message:'this is can not update',
      status:false
    })
  }
  res.status(200).json({
    message:'Leave is update',
    status:true
  })
})



module.exports = router;