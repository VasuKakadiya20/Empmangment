const mongoose = require('mongoose');

const attendanceSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  firstIn: {
    type: String, 
    required: true,
  },
  break: {
    type: String, 
    required: true,
  },
  breakOut: {
    type: String, 
    required: true,
  },
  lastOut: {
    type: String,
    required: true,
  },
  totalHours: {
    type: String, 
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  shift: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('attendanceData', attendanceSchema);
