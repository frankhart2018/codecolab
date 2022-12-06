import { createAsyncThunk } from "@reduxjs/toolkit";
import * as project_service from "./project-service";

export const getProjectByIdThunk = createAsyncThunk(
  "/project/getProjectById",
  async (id) => {
    const response = await project_service.getProjectById(id);
    return response;
  }
);

export const createDirInProjectThunk = createAsyncThunk(
  "/project/createDirInProject",
  async (payload) => {
    const response = await project_service.createDirInProject(
      payload.project_id,
      payload.dir_name,
      payload.path
    );
    return response;
  }
);

export const createFileInProjectThunk = createAsyncThunk(
  "/project/createFileInProject",
  async (payload) => {
    const response = await project_service.createFileInProject(
      payload.project_id,
      payload.file_name,
      payload.path
    );
    return response;
  }
);
