import { createAsyncThunk } from "@reduxjs/toolkit";

import * as pyrunner_service from "./pyrunner-service";

export const getPythonVersionThunk = createAsyncThunk(
  "pyrunner/getPythonVersion",
  async () => await pyrunner_service.getPythonVersion()
);
