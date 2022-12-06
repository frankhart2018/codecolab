import axios from "axios";
const API_BASE = "http://localhost:4000/api";
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
