import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
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

export const createProjectThunk = createAsyncThunk(
  "/project/createProject",
  async (payload) => {
    const response = await project_service.createProject(payload);
    return response;
  }
);

export const deleteInProjectThunk = createAsyncThunk(
  "/project/deleteInProject",
  async (payload) => {
    const response = await project_service.deleteInProject(
      payload.project_id,
      payload.name,
      payload.path
    );
    return response;
  }
);

export const renameInProjectThunk = createAsyncThunk(
  "/project/renameInProject",
  async (payload) => {
    const response = await project_service.renameInProject(
      payload.project_id,
      payload.name,
      payload.new_name,
      payload.path
    );
    return response;
  }
);

export const openFileInProjectThunk = createAsyncThunk(
  "/project/openFileInProject",
  async (payload) => {
    const response = await project_service.openFileInProject(
      payload.project_id,
      payload.path
    );

    const url = response.url;
    const responseContent = await axios.get(url);

    return {
      contents: responseContent.data,
      path: payload.path,
      s3URI: response.url,
    };
  }
);

export const starProjectThunk = createAsyncThunk(
  "/project/starProject",
  async (payload) => {
    const response = await project_service.starProject(
      payload.project_id,
      payload.user_id
    );
    return response;
  }
);

export const unstarProjectThunk = createAsyncThunk(
  "/project/unstarProject",
  async (payload) => {
    const response = await project_service.unstarProject(
      payload.project_id,
      payload.user_id
    );
    return response;
  }
);

export const isProjectStarredThunk = createAsyncThunk(
  "/project/isProjectStarred",
  async (payload) => {
    const response = await project_service.isProjectStarred(
      payload.project_id,
      payload.user_id
    );
    return response;
  }
);

export const hasWritePermissionThunk = createAsyncThunk(
  "/project/hasWritePermission",
  async (payload) => {
    const response = await project_service.hasWritePermission(
      payload.project_id,
      payload.user_id
    );
    return response;
  }
);
