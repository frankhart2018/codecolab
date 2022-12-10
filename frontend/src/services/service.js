import axios from "axios";
const API_BASE = process.env.REACT_APP_API_URL;
console.log("API_BASE ", API_BASE);

export const loginUser = async (user) => {
  const response = await axios.post(`${API_BASE}/api/login`, user);
  console.log("response", response);
  return response.data;
};
export const registerUser = async (user) => {
  const response = await axios.post(`${API_BASE}/api/register`, user);
  console.log("response", response);
  return response.data;
};

export const forgotPasword = async (email) => {
  const response = await axios.post(`${API_BASE}/api/forget-password`, email)
  console.log("response", response);
  return response
}
export const updatePassword = async ({ password, id, token }) => {
  const response = await axios.post(`${API_BASE}/api/update-password/${id}/${token}`, { password: password })
  console.log("response", response);
  return response
}
export const userData = async ({ token }) => {
  const response = await axios.post(`${API_BASE}/api/userData`, { token: token })
  console.log("response", response);
  return response.data
}
