const mongoose = require("mongoose");

const ChatSchema = new mongoose.Schema({
    admin: {
         type: String, 
         default: "Admin" 
        }, 
            employeeId: { type: String, required: true, unique: true },
    employeeName: { 
        type: String, 
        required: true 
    },
    latestMessage: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Message" 
    },
}, { timestamps: true });

module.exports = mongoose.model("Chat", ChatSchema);
