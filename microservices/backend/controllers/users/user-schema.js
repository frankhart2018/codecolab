import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    email: String,
    password: String,
    name: String,
    username: { type: String, unique: true },
    starred_projects: { type: Map, of: String, default: {} },
    viewing_projects: { type: Map, of: String, default: {} },
    editing_projects: { type: Map, of: String, default: {} },
  },
  { collection: "users" }
);
export default schema;
