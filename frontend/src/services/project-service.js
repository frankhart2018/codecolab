import axios from "axios";
const API_BASE = `${process.env.REACT_APP_API_URL}/api`;
console.log("API_BASE ", API_BASE);

export const getProjectById = async (id) => {
  const response = await axios.get(`${API_BASE}/project/${id}`);
  return response.data;
};

export const createDirInProject = async (project_id, dir_name, path) => {
  const response = await axios.post(
    `${API_BASE}/create-project/dir/${project_id}`,
    {
      dir_name,
      path,
    }
  );
  return response.data;
};

export const createFileInProject = async (project_id, file_name, path) => {
  const response = await axios.post(
    `${API_BASE}/create-project/file/${project_id}`,
    {
      file_name,
      path,
    }
  );
  return response.data;
};

export const deleteInProject = async (project_id, name, path) => {
  const response = await axios.delete(
    `${API_BASE}/delete-project/${project_id}`,
    {
      data: {
        name,
        path,
      },
    }
  );
  return response.data;
};

export const renameInProject = async (project_id, name, new_name, path) => {
  const response = await axios.put(`${API_BASE}/rename-project/${project_id}`, {
    name,
    new_name,
    path,
  });
  return response.data;
};

export const createProject = async (payload) => {
  console.log("payload", payload);
  const response = await axios.post(`${API_BASE}/create-project`, payload);
  console.log("response", response);
  return response.data;
};

export const openFileInProject = async (project_id, path) => {
  const response = await axios.post(`${API_BASE}/get-project/${project_id}`, {
    path,
  });

  return response.data;
};

export const starProject = async (project_id, user_id) => {
  const response = await axios.post(`${API_BASE}/star-project/${project_id}`, {
    user_id,
  });
  return response.data;
};

export const unstarProject = async (project_id, user_id) => {
  const response = await axios.post(
    `${API_BASE}/unstar-project/${project_id}`,
    {
      user_id,
    }
  );
  return response.data;
};

export const isProjectStarred = async (project_id, user_id) => {
  const response = await axios.post(
    `${API_BASE}/is-project-starred/${project_id}`,
    {
      user_id,
    }
  );
  return response.data;
};

export const updateCodeInS3 = async (project_id, path, code) => {
  const response = await axios.post(
    `${API_BASE}/update-project/${project_id}`,
    {
      path,
      code,
    }
  );
  return response.data;
};

export const hasWritePermission = async (project_id, user_id) => {
  const response = await axios.post(
    `${API_BASE}/has-write-permission/${project_id}`,
    {
      user_id,
    }
  );
  return response.data;
};
