const express = require("express");
const Chat = require("../models/chat");
const Message = require("../models/Message");

const router = express.Router();

// chat.routes.js
// router.post("/create", async (req, res) => {
//   try {
//     const { employeeId, employeeName } = req.body;
//     console.log("this is a emp:",employeeName)

//     let chat = await Chat.findOne({ employeeId });
//     console.log("this is a chat",chat)

//     if (!chat) {
//       chat = await Chat.create({ employeeId, employeeName });
//       await chat.save();
//     }

//     res.json(chat);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// });

router.post("/create", async (req, res) => {
  try {
    const { employeeId, employeeName } = req.body;
      console.log("this is a emp:",employeeName)


    if (!employeeId) {
      return res.status(400).json({ error: "employeeId is required" });
    }

    let chat = await Chat.findOne({ employeeId });
    if (!chat) {
      chat = await Chat.create({ employeeId, employeeName });
    }
    

    res.json(chat);
  } catch (err) {
    console.error("Chat create error:", err.message);
    res.status(500).json({ error: err.message });
  }
});


router.get("/", async (req, res) => {
  try {
    const chats = await Chat.find({})
      .populate("latestMessage")
      .sort({ updatedAt: -1 });
    res.json(chats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/:id" , async(req,res) =>{
    const deletechat = await Chat.findByIdAndDelete(req.params.id)
    if(!deletechat){
      return res.status(404).json({
        message:"this is Chat not Defind",
        status:false
      })
    }
    res.status(200).send({
      message:"deleted chat!",
      status:true
    })
})

router.delete("/delete/:name", async (req, res) => {
  try {
   const empname = req.params.name; 

    const deletedData = await Chat.deleteMany({ employeeName: empname });

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

module.exports = router;
