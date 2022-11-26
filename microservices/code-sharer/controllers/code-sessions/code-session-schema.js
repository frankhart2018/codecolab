import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    room_id: String,
    code: String,
    num_active_users: Number,
  },
  { collection: "code_sessions" }
);

export default schema;
