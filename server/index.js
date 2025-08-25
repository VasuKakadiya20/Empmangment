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

const app = express();
const server = http.createServer(app);   // 👈 create HTTP server
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
const employeeRoutes = require('./routes/employee');
const signupRoutes = require('./routes/singup');
const attendanceRoutes = require('./routes/attendanceData');
const leaveRoutes = require('./routes/leave');
const taskRoutes = require('./routes/task');

app.use('/emp', employeeRoutes);
app.use('/signup', signupRoutes);
app.use('/att', attendanceRoutes);
app.use('/leave', leaveRoutes);
app.use('/task', taskRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Hello World');
});

// Attach socket.io
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",   // frontend port (vite/react)
    methods: ["GET", "POST"]
  }
});

// Global socket reference
app.set("socketio", io);

io.on("connection", (socket) => {
  console.log("🔗 User connected:", socket.id);

  socket.on("disconnect", () => {
    console.log("❌ User disconnected:", socket.id);
  });
});

// DB + Start server
mongoose.connect(process.env.CONNECTION_STRING)
  .then(() => {
    console.log('✅ Database Connection is ready...');
    server.listen(PORT, () => {         // 👈 use server.listen
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch(err => {
    console.log(err);
  });
