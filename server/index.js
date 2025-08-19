require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;


app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use(cors());
app.use(express.json());

const employeeRoutes = require('./routes/employee');
const signupRoutes = require('./routes/singup');
const attendanceRoutes = require('./routes/attendanceData');
const leaveRoutes = require('./routes/leave')
const taskRoutes = require('./routes/task')
app.use('/emp', employeeRoutes);
app.use('/signup', signupRoutes);
app.use('/att',attendanceRoutes)
app.use('/leave',leaveRoutes)
app.use('/task',taskRoutes)


mongoose.connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log('Database Connection is ready...');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
  });
