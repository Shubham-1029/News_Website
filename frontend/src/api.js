import axios from 'axios';

const API_URL = 'http://localhost:8000/api';  // Adjust the URL as per your backend setup

// Register
export const register = async (userData) => {
  return await axios.post(`${API_URL}/register/`, userData);
};

// Login
/* export const login = async (userData) => {
  return await axios.post(`${API_URL}/login/`, userData);
}; */
function login(formData) {
  return axios.post(`${API_URL}/login/`, formData).then(response => response.data).catch(error => {
    throw error;
  });
}

export { login }

// Get Articles
export const getArticles = async () => {
  return await axios.get(`${API_URL}/articles/`);
};

// Get Article Detail
export const getArticleDetail = async (articleId) => {
  return await axios.get(`${API_URL}/articles/${articleId}/`);
};

// Get Comments
export const getComments = async (articleId) => {
  try {
    const response = await axios.get(`${API_URL}/articles/${articleId}/comments/`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch comments', error);
    throw error;  // Propagate the error to handle in the component
  }
};

// Post Comment
export const postComment = async (articleId, commentData, token) => {
  return await axios.post(`${API_URL}/articles/${articleId}/comments/`, commentData, {
    headers: { Authorization: `Token ${token}` }
  });
};

// Write Article
export const writeArticle = async (articleData, token) => {
  return await axios.post(`${API_URL}/articles/`, articleData, {
    headers: { Authorization: `Token ${token}` }
  });
};

export const editArticle = async (articleId, articleData, token) => {
  try {
    const response = await axios.put(`${API_URL}/articles/${articleId}/`, articleData, {
      headers: { Authorization: `Bearer ${token}` } // Update this line
    });
    return response.data;
  } catch (error) {
    console.error('Error editing article:', error);
    throw error;
  }
};

// Update Article Tags
export const updateArticleTags = async (articleId, tagData, token) => {
  return await axios.post(`${API_URL}/articles/${articleId}/tags/`, tagData, {
    headers: { Authorization: `Token ${token}` }
  });
};

export const getLatestArticles = (token) => {
  return axios.get(`${API_URL}/latest-articles/`, {
    headers: { Authorization: `Token ${token}` }
  }).then(response => response.data);
};
