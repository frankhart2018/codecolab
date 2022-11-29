import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;

export const getPythonVersion = async () => {
  const response = await axios.get(`${API_BASE}/py-version`);
  return response.data;
};
