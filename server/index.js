// require('dotenv').config();
// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');

// const app = express();
// const PORT = process.env.PORT || 5000;


// app.get('/', (req, res) => {
//   res.send('Hello World');
// });

// app.use(cors());
// app.use(express.json());

// const employeeRoutes = require('./routes/employee');
// const signupRoutes = require('./routes/singup');
// const attendanceRoutes = require('./routes/attendanceData');
// const leaveRoutes = require('./routes/leave')
// const taskRoutes = require('./routes/task')
// app.use('/emp', employeeRoutes);
// app.use('/signup', signupRoutes);
// app.use('/att',attendanceRoutes)
// app.use('/leave',leaveRoutes)
// app.use('/task',taskRoutes)


// mongoose.connect(process.env.CONNECTION_STRING)
//   .then(() => {
//     console.log('Database Connection is ready...');
//     app.listen(PORT, () => {
//       console.log(`Server is running on port ${PORT}`);
//     });
//   })
//   .catch(err => {
//     console.log(err);
//   });

require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const http = require('http');
const { Server } = require('socket.io');
const cloudinary = require('cloudinary').v2;

const app = express();
const server = http.createServer(app); 
const PORT = process.env.PORT || 5000;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const employeeRoutes = require('./routes/employee');
const signupRoutes = require('./routes/singup');
const attendanceRoutes = require('./routes/attendanceData');
const leaveRoutes = require('./routes/leave');
const taskRoutes = require('./routes/task');
const meassage = require('./routes/message')
const chatRoutes = require('./routes/chat')

app.use('/uploads', express.static('uploads'));
app.use('/emp', employeeRoutes);
app.use('/signup', signupRoutes);
app.use('/att', attendanceRoutes);
app.use('/leave', leaveRoutes);
app.use('/task', taskRoutes);
app.use('/msg' , meassage)
app.use('/chat',chatRoutes)

app.get('/', (req, res) => {
  res.send('Hello World');
});

const io = new Server(server, {
  cors: {
    origin: [
      "https://empmangment.vercel.app",     
      "https://admin-vasu-1234.vercel.app",   
    ],
    methods: ["GET", "POST"]
  }
});


app.set("socketio", io);
io.on("connection", (socket) => {
  console.log("🔗 User connected:", socket.id);

  socket.on("joinRoom", (username) => {
    console.log(`👤 User ${username} joined room`);
    socket.join(username);
  });


  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});


mongoose.connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log('✅ Database Connection is ready...');
    server.listen(PORT, () => {        
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
  });
