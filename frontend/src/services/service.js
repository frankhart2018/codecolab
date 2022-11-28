import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_URL
console.log("API_BASE ", API_BASE);

export const loginUser = async (user) => {
    const response = await axios.post(`${API_BASE}/api/login`, user)
    console.log("response", response);
    return response.data;
}
export const registerUser = async (user) => {
    const response = await axios.post(`${API_BASE}/api/register`, user)
    console.log("response", response);
    return response.data;
}
