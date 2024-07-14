import axios from 'axios';

const API_URL = 'http://localhost:8000/api';  // Adjust the URL as per your backend setup

// Register
export const register = async (formData) => {
  try {
    const response = await axios.post(`${API_URL}/register/`, formData, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    throw error; // Ensure error is thrown for proper handling in Register.jsx
  }
};

function login(formData) {
  return axios.post(`${API_URL}/login/`, formData).then(response => response.data).catch(error => {
    throw error;
  });
}
export { login };

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

// Write Article
export const writeArticle = async (articleData, token) => {
  return await axios.post(`${API_URL}/articles/`, articleData, {
    headers: { Authorization: `Token ${token}` }
  });
};

// Edit Article
export const editArticle = async (articleId, articleData, token) => {
  try {
    const response = await axios.put(`${API_URL}/articles/${articleId}/`, articleData, {
      headers: { Authorization: `Token ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error editing article:', error);
    throw error;
  }
};

export const getUserDetails = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`${API_URL}/user/`, {
      headers: { Authorization: `Token ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error.response);
    throw error;
  }
};


// Get Latest Articles
export const getLatestArticles = async (token) => {
  try {
    const response = await axios.get(`${API_URL}/latest-articles/`, {
      headers: { Authorization: `Token ${token}` }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Get Tags
export const getTags = async () => {
  try {
    const response = await axios.get(`${API_URL}/tags/`);
    return response.data;
  } catch (error) {
    console.error('Error fetching tags:', error);
    throw error;
  }
};

// Create Tag
export const createTag = async (tagData, token) => {
  try {
    const response = await axios.post(`${API_URL}/tags/`, tagData, {
      headers: { Authorization: `Token ${token}`, 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating tag:', error);
    throw error;
  }
};

// Update Tags for Article
export const updateArticleTags = async (articleId, tags, token) => {
  try {
    const response = await axios.put(`${API_URL}/articles/${articleId}/tags/`, { tags }, {
      headers: { Authorization: `Token ${token}`, 'Content-Type': 'application/json' }
    });
    return response.data;
  } catch (error) {
    console.error('Error updating tags for article:', error);
    throw error;
  }
};

// Delete Tag
export const deleteTag = async (tagId, token) => {
  try {
    await axios.delete(`${API_URL}/tags/${tagId}/`, {
      headers: { Authorization: `Token ${token}` }
    });
  } catch (error) {
    console.error('Error deleting tag:', error);
    throw error;
  }
};

export const getPopularTags = async () => {
  const response = await axios.get(`${API_URL}/tags/popular/`);
  return response.data;
};

export const getArticlesByTag = async (tag) => {
  const response = await axios.get(`${API_URL}/articles/by-tag/?tag=${tag}`);
  console.log(tag)
  return response.data;
};

export const getUserArticles = async () => {
  const token = localStorage.getItem('token');
  try {
    const response = await axios.get(`${API_URL}/user/articles/`, {
      headers: { Authorization: `Token ${token}` }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching user articles:', error.response);
    throw error;  
  }
};

// delete articles
export const deleteArticle = async (articleId, token) => {
  const response = await axios.delete(`http://localhost:8000/api/articles/${articleId}/`, {
    headers: {
      Authorization: `Token ${token}`,
    },
  });
  return response; 
};