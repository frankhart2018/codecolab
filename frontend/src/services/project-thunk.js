import { createAsyncThunk } from "@reduxjs/toolkit";
import * as project_service from "./project-service";

export const getProjectByIdThunk = createAsyncThunk(
  "/project/getProjectById",
  async (id) => {
    const response = await project_service.getProjectById(id);
    return response;
  }
);
