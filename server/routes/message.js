const express = require("express");
const Message = require("../models/Message");
const Chat = require("../models/chat");

const router = express.Router();


router.post("/", async (req, res) => {
  try {
    const { chatId, sender, message ,receiver} = req.body;

    const newMessage = await Message.create({ chatId, sender, message ,receiver});


    await Chat.findByIdAndUpdate(chatId, { latestMessage: newMessage._id });
    
const io = req.app.get("socketio");
    const receivername = newMessage.receiver;

    io.to(receivername).emit("chatmassge",{
      message:"this is meassge for you !",
      data:newMessage,
    })

      res.status(201).json(newMessage)

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/:chatId", async (req, res) => {
  try {
    const messages = await Message.find({ chatId: req.params.chatId })
      .sort({ createdAt: 1 }); 
    res.json(messages);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}); 
router.delete("/:chatId" , async (req,res)=>{
  try{
      const {chatId} = req.params;
      const result = await Message.deleteMany({chatId})
      res.status(200).json({
        success:true,
        message:"All meassage Deleted Succefully",
      })
  }catch (err){
    res.status(500).json({success:false , error:err.message})
  }
})

module.exports = router;
