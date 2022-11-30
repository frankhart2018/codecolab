import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    socket_id: String,
    room_id: String,
  },
  { collection: "socket_sessions" }
);

export default schema;
