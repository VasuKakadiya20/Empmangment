const mongoose = require('mongoose')

const leaveschema = mongoose.Schema({
    name: {
     type: mongoose.Schema.Types.ObjectId,
     ref: 'employee',
     required: true,
   },
   Department:{
    type: String,
    required:true
   },
   leavetype:{
    type:String,
    required:true,
   },
   leaveFrom:{
    type:String,
    required:true
   },
   leaveTo :{
    type:String,
    required:true
   },
   Numberofdays:{
    type:String,
    required:true
   },
   Status:{
    type:String,
    required:false
   },
   Reason:{
    type:String,
    required:true
   },
   RequestedOn :{
    type:String,
    required:true
   },
   ApprovedBy:{
    type:String,
    required:false
   },
   ApprovedDate:{
    type:String,
    required:false
   }
})

exports.leave = mongoose.model('leave',leaveschema) 