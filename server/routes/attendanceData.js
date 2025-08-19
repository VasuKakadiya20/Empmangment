const express = require('express');
const attendanceData = require('../models/attendanceData');
const router  = express.Router();

router.get('/', async (req, res) => {
    try {
        const attendancelist = await attendanceData.find()
            .populate('name', 'name');  

        if (!attendancelist) {
            return res.status(500).json({ success: false });
        }

        res.json(attendancelist);
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
});

router.post('/create', async (req, res) => {
    try{
  let attendance = new attendanceData({
    name: req.body.name,
    firstIn:req.body.firstIn,
    break:req.body.break,
    breakOut:req.body.breakOut,
    lastOut:req.body.lastOut,
    totalHours:req.body.totalHours,
    status:req.body.status,
    shift:req.body.shift
  });
  console.log(attendance);

  attendance = await attendance.save();
  if (!attendance) {
    return res.status(500).json({
      error: "Error saving attendance",
      success: false
    });
  }
  res.status(201).json(attendance);  
    }catch (err) {
    console.error(err); 
    res.status(500).json({ error: err.message });
  }
  
});

router.delete('/:id', async(req,res)=>{
    const deleteAttendance = await attendanceData.findByIdAndDelete(req.params.id);
    if(!deleteAttendance){
      return res.status(404).json({
        message:"Attendance does not found!",
        status:false
      })
    }
    res.status(200).send({
      message:"Attendance is deleted!",
      status:true
    })
})

router.delete("/delete/:id", async (req, res) => {
  try {
    const empid = req.params.id; 

    const deletedData = await attendanceData.deleteMany({ "name": empid });

    if (deletedData.deletedCount === 0) {
      return res.status(404).json({
        message: "No attendance data found for this employee!",
        Status: false
      });
    }

    res.status(200).json({
      message: "Attendance data deleted successfully!",
      Status: true
    });

  } catch (error) {
    res.status(500).json({
      message: "Error deleting attendance data",
      error: error.message,
      Status: false
    });
  }
});

router.get('/:id' ,async(req,res)=>{
  const attendance = await attendanceData.findById(req.params.id) .populate('name', 'name');  ;
  if(!attendance){
    res.status(500).json({message:'the attendance given id was not found.'})
  }
  return res.status(200).send(attendance);
})

router.put('/:id', async(req,res)=>{
  const attendance = await attendanceData.findByIdAndUpdate(
    req.params.id,{
      name: req.body.name,
    firstIn:req.body.firstIn,
    break:req.body.break,
    breakOut:req.body.breakOut,
    lastOut:req.body.lastOut,
    totalHours:req.body.totalHours,
    status:req.body.status,
    shift:req.body.shift
    },
    {new:true}
  );

  if(!attendance){
    res.status(404).json({
      message:'this is can not update',
      status:false
    })
  }
  res.status(200).json({
    message:'attendance is update',
    status:true
  })
})

module.exports = router;