const express = require("express");
const dotenv = require("dotenv");
const colors = require("colors");
const morgan = require("morgan");
const cors = require("cors");
const { Server } = require("socket.io");
const http = require("http");
const connectDB = require("./config/db");
const bloodRequestRoutes = require("./routes/bloodRequests");
const Notification = require("./models/Notification");

// dot config
dotenv.config();

// const allowedOrigins = ["http://localhost:3000"];

const allowedOrigins = [
  "http://localhost:3000",
  "https://blood-bank-management-system-drab.vercel.app",
  "https://blood-bank-management-system-e1vmac1nq-nuradnans-projects.vercel.app",
];

// MongoDB connection
connectDB()
  .then(() => {
    console.log("Database connected successfully".green);
  })
  .catch(() => {
    console.error("Database connection failed".red);
  });

// REST object
const app = express();
const server = http.createServer(app);

// Socket.IO setup
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Middlewares
app.use(express.json());
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(morgan("dev"));

// Routes
app.use("/api/v1/blood-requests", bloodRequestRoutes);
app.use("/api/v1/test", require("./routes/testRouts"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/inventory", require("./routes/inventoryRoutes"));
app.use("/api/v1/analytics", require("./routes/analyticsRoutes"));
app.use("/api/v1/admin", require("./routes/adminRoutes"));
app.use("/api/v1/donors", require("./routes/donorRoutes"));
app.use("/api/v1/patient", require("./routes/patientRoutes"));
app.use("/api/v1/chats", require("./routes/chatRoutes"));
app.use("/api/v1/feedback", require("./routes/feedbackRoutes"));
app.use("/api/v1/notifications", require("./routes/notificationRoutes"));

// Real-time Chat
const activeUsers = new Map();

io.on("connection", (socket) => {
  console.log("New client connected".yellow);

  // Add user to activeUsers map
  socket.on("join", ({ userId, userType }) => {
    activeUsers.set(userId, socket.id);
    console.log(`${userType} with ID ${userId} joined`.green);
  });

  // Handle sending messages
  socket.on(
    "sendMessage",
    async ({ senderId, senderName, recipientId, message, userType }) => {
      const recipientSocketId = activeUsers.get(recipientId);

      if (recipientSocketId) {
        // Save the notification to the database
        // Validate and normalize userType
        const normalizedType = userType === "donar" ? "donor" : userType;
        const notification = new Notification({
          senderId,
          senderName,
          senderType: normalizedType, // Use normalized type
          recipient: recipientId,
          message: `New message from ${senderName}: "${message}"`,
          read: false,
        });
        await notification.save();

        const recipientSocketId = activeUsers.get(recipientId);
        if (recipientSocketId) {
          io.to(recipientSocketId).emit("newNotification", notification);
          console.log(`Notification sent to ${recipientId}`.blue);
        }
        // Send the message to the recipient
        io.to(recipientSocketId).emit("receiveMessage", {
          senderId,
          senderName,
          message,
          timestamp: new Date().toISOString(),
        });

        // Send a notification for the message
        io.to(recipientSocketId).emit("receiveNotification", {
          senderId,
          senderName,
          senderType: userType,
          message: `New message from ${senderName}: "${message}"`,
          timestamp: new Date().toISOString(),
        });

        console.log(`Message sent from ${senderId} to ${recipientId}`.blue);
      } else {
        console.log(`User with ID ${recipientId} is not connected`.red);
      }
    }
  );

  // Remove user from activeUsers map on disconnect
  socket.on("disconnect", () => {
    activeUsers.forEach((value, key) => {
      if (value === socket.id) activeUsers.delete(key);
    });
    console.log("Client disconnected".red);
  });
});

// Server port
const PORT = process.env.PORT || 8080;

// Listen
server.listen(PORT, () => {
  console.log(
    `Node server is running in ${process.env.DEV_MODE} mode on port ${PORT}`
      .bgBlue.white
  );
});
