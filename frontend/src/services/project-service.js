import axios from "axios";
const API_BASE = "http://localhost:4000/api";
console.log("API_BASE ", API_BASE);

export const getProjectById = async (id) => {
  const response = await axios.get(`${API_BASE}/project/${id}`);
  return response.data;
};
