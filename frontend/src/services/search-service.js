import axios from "axios";
// const API_BASE = process.env.REACT_APP_API_URL;
const KEY = 'Zv*dAp7WeF3GFkGdRgaZeA(('
const REMOTE_API_BASE = 'https://api.stackexchange.com/2.3/'
const API_BASE = 'http://localhost:4000'

export const getQuestions = async (query) => {
    const SEARCH_QUESTION = 'search/advanced?page=1&pagesize=5&order=desc&sort=relevance&site=stackoverflow&filter=!6Wfm_gRpwPVC8'
    const response = await axios.get(`${REMOTE_API_BASE}${SEARCH_QUESTION}&q=${query}&key=${KEY}`);
    return response.data;
};

export const createQuestion = async (query) => {
    const response = await axios.post(`${API_BASE}/api/create-search`, query)
    return response
}

export const updateQuestions = async (question) => {
    await axios.put(`${API_BASE}/api/${question._id}`, question);
    return question;
}

