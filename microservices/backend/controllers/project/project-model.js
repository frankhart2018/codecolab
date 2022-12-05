import mongoose from "mongoose";

import projectSchema from "./project-schema.js";

const projectModel = mongoose.model("ProjectModel", projectSchema);

export default projectModel;
