import mongoose from "mongoose";

// Tree file structure schema
const FileStructureSchema = new mongoose.Schema();
FileStructureSchema.add({
  name: String,
  type: String,
  s3_uri: String,
  children: [FileStructureSchema],
});

const schema = new mongoose.Schema(
  {
    name: String,
    language: String,
    owner_id: String,
    description: String,
    file_structure: FileStructureSchema,
  },
  { collection: "projects" }
);

export default schema;
