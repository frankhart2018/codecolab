import { createAsyncThunk } from "@reduxjs/toolkit";

import * as run_service from "./run-service";
import * as project_service from "./project-service";

export const runCodeThunk = createAsyncThunk(
  "/run/runCode",
  async (payload) => {
    const response = await project_service.updateCodeInS3(
      payload.project_id,
      payload.path,
      payload.code
    );

    if (response.status === 200) {
      const response2 = await run_service.runCode(payload.s3URI);
      return response2;
    }
  }
);
