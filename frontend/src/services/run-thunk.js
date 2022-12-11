import { createAsyncThunk } from "@reduxjs/toolkit";

import * as run_service from "./run-service";

export const runCodeThunk = createAsyncThunk(
  "/run/runCode",
  async (payload) => {
    const response = await run_service.runCode(payload.s3URI);
    return response;
  }
);
