import mongoose from "mongoose";
const schema = mongoose.Schema(
  {
    email: String,
    password: String,
    name: String,
    username: String
  },
  { collection: "users" }
);
export default schema;
