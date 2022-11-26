import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import http from "http";
import { Server } from "socket.io";

import CodeSessionSocketController from "./controllers/code-sockets/code-session-socketio.js";

const CONNECTION_STRING =
  process.env.DB_CONNECTION_STRING || "mongodb://localhost:27017/code_sessions";
mongoose.connect(CONNECTION_STRING);

const app = express();
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  CodeSessionSocketController(socket);
});

server.listen(8000, "0.0.0.0", () => {
  console.log("Server started on port 8000");
});
