const express = require('express')
const { leave } = require('../models/leave')
const router = express.Router()

router.get('/' , async (req,res)=>{
    try{
        const leavelist = await leave.find()
          .populate('name', 'name');  
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
           Department:req.body.Department,
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
    res.status(500).json({message:'the employees given id was not found.'})
  }
  return res.status(200).send(Leave);
})

router.delete('/:id', async(req,res)=>{
    const deleteleave = await leave.findByIdAndDelete(req.params.id);
    if(!deleteleave){
      return res.status(404).json({
        message:"Attendance does not found!",
        status:false
      })
    }
    res.status(200).send({
      message:"Attendance product is deleted!",
      status:true
    })
})

router.put('/:id', async(req,res)=>{
  const  Leave = await leave.findByIdAndUpdate(
    req.params.id,{
       name:req.body.name,
           Department:req.body.Department,
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
    message:'Employees is update',
    status:true
  })
})



module.exports = router;