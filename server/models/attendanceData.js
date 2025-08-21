const mongoose = require('mongoose');

const attendanceSchema = mongoose.Schema({
 name: {
  type: String,
  required: true,
},
  firstIn: {
    type: String, 
    required: false,
  },
  break: {
    type: String, 
    required: false,
  },
  breakOut: {
    type: String, 
    required: false,
  },
  lastOut: {
    type: String,
    required: false,
  },
  totalHours: {
    type: String, 
    required: false,
  },
   date: { 
    type: String, 
    required: true 
  }, 
});

module.exports = mongoose.model('attendanceData', attendanceSchema);
