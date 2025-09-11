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

router.get("/today", async (req, res) => {
  try {
    const { name, date } = req.query;
    const record = await attendanceData.findOne({ name, date });
    res.json({ success: true, record });
  } catch (err) {
    res.status(500).json({ success: false, message: "Error fetching attendance" });
  }
});

router.post("/mark", async (req, res) => {
  try {
    const { name, firstIn, break: breakIn, breakOut, lastOut, totalHours } = req.body;

    const today = new Date().toISOString().split("T")[0];

    let record = await attendanceData.findOne({ name, date: today });

    if (!record) {
      record = new attendanceData({ name, date: today });
    }

    if (firstIn) record.firstIn = firstIn;
    if (breakIn) record.break = breakIn;
    if (breakOut) record.breakOut = breakOut;
    if (lastOut) record.lastOut = lastOut;
    if (totalHours) record.totalHours = totalHours;

    await record.save();

    res.json({ success: true, record });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: err.message });
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

router.delete("/delete/:name", async (req, res) => {
  try {
   const empname = req.params.name; 

    const deletedData = await attendanceData.deleteMany({ name: empname });

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
  const attendance = await attendanceData.findById(req.params.id) ;
  if(!attendance){
    res.status(500).json({message:'the attendance given id was not found.'})
  }
  return res.status(200).send(attendance);
})

router.get("/attendance/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const attendance = await attendanceData.find({ name })

    if (!attendance) {
      return res.status(404).json({
        message: "No leave record found",
        status: false
      });
    }

  return res.status(200).send(attendance);
  } catch (err) {
    res.status(500).json({
      message: "Server error",
      status: false,
      error: err.message
    });
  }
});

module.exports = router;