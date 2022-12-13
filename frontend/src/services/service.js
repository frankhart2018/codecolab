import axios from "axios";
const API_BASE = process.env.REACT_APP_API_URL;
// const API_BASE = 'http://localhost:4000'
console.log("API_BASE ", API_BASE);

export const loginUser = async (user) => {
  const response = await axios.post(`${API_BASE}/api/login`, user);
  return response.data;
};
export const registerUser = async (user) => {
  const response = await axios.post(`${API_BASE}/api/register`, user);
  return response.data;
};

export const forgotPasword = async (email) => {
  const response = await axios.post(`${API_BASE}/api/forget-password`, email);
  return response;
};
export const updatePassword = async ({ password, id, token }) => {
  const response = await axios.post(
    `${API_BASE}/api/update-password/${id}/${token}`,
    { password: password }
  );
  return response;
};
export const userData = async ({ token }) => {
  const response = await axios.post(`${API_BASE}/api/userData`, {
    token: token,
  });
  return response.data;
};

export const logoutUser = async () => {
  const response = await axios.post(`${API_BASE}/api/logout`);
  return response.data;
};

export const updateUser = async (user) => {
  const { currentUser, profileData } = user;
  const response = await axios.put(
    `${API_BASE}/api/update/${currentUser._id}`,
    profileData
  );
  return response;
};
