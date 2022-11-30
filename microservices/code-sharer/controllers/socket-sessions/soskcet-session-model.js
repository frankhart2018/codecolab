import mongoose from "mongoose";

import socketSessionSchema from "./socket-session-schema.js";

const socketSessionModel = mongoose.model(
  "SocketSessions",
  socketSessionSchema
);

export default socketSessionModel;
