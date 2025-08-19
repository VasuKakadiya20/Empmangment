const mongoose = require('mongoose')

const taskschema = mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'employee',
        required: true,
      },
      title :{
        type:String,
        required:true
      },
      duedate:{
        type:String,
        required:true
      },
      details:{
        type:String,
        required:true
      },
      status:{
        type:String,
        required:true
      }
})

exports.task = mongoose.model('task',taskschema)