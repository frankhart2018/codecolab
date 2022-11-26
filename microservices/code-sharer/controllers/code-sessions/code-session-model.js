import mongoose from "mongoose";

import codeSessionSchema from "./code-session-schema.js";

const codeSessionModel = mongoose.model("CodeSessions", codeSessionSchema);

export default codeSessionModel;
