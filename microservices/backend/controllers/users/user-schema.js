import mongoose from "mongoose";

const starred_project = mongoose.Schema({
  project_id: mongoose.Schema.Types.ObjectId,
  project_name: String,
});

const schema = mongoose.Schema(
  {
    email: String,
    password: String,
    name: String,
    username: String,
    starred_projects: [starred_project],
  },
  { collection: "users" }
);
export default schema;
