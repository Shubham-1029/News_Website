import { useState, useEffect } from 'react';
import axios from 'axios';
import '../components/css/WriteArticle.css';

const API_URL = 'http://localhost:8000/api';

const WriteArticle = () => {
  const [formData, setFormData] = useState({ title: '', content: '', image: null, image_caption: '', categories: [] });
  const [allCategories, setAllCategories] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}/categories/`, {
          headers: { Authorization: `Token ${token}` },
        });
        setAllCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, [token]);

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategories = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({ ...formData, categories: selectedCategories });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const articleData = new FormData();
    articleData.append('title', formData.title);
    articleData.append('content', formData.content);
    if (formData.image) {
      articleData.append('image', formData.image);
    }
    articleData.append('image-caption', formData.image_caption);
  
    // Send categories as a list
    formData.categories.forEach(category => {
      articleData.append('category_names', category);
    });
  
    try {
      const response = await axios.post(`${API_URL}/articles/`, articleData, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Article posted successfully!');
      setFormData({ title: '', content: '', image: null, image_caption: '', categories: [] });
    } catch (error) {
      console.error('Failed to post article', error.response ? error.response.data : error);
      alert('Failed to post article');
    }
  };
  return (
    <div className="container-xxl mt-5">
      <h1 className="text-center mb-4">Write an Article</h1>
      <form onSubmit={handleSubmit} className="bg-light p-4 rounded">
        <div className="form-group mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            className="form-control"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <hr />
        <div className="form-group mb-3">
          <label htmlFor="content" className="form-label">Content</label>
          <textarea
            name="content"
            id="content"
            className="form-control"
            placeholder="Content"
            value={formData.content}
            onChange={handleChange}
            rows="10"
            required
          ></textarea>
        </div>
        <hr />
        <div className="form-group mb-3">
          <label htmlFor="image" className="form-label">Image</label>
          <input
            type="file"
            name="image"
            id="image"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <hr />
        <div className="form-group mb-3">
          <label htmlFor="image-caption" className="form-label">Image Caption</label>
          <input
            type="text"
            name="image_caption"
            id="image-caption"
            className="form-control"
            placeholder="Image Caption"
            value={formData.image_caption}
            onChange={handleChange}
          />
        </div>
        <hr />
        <div className="form-group mb-3">
          <label htmlFor="categories" className="form-label">Categories</label>
          <select
            name="categories"
            id="categories"
            className="form-control"
            multiple
            value={formData.categories}
            onChange={handleCategoryChange}
          >
            {allCategories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-secondary w-100">Post Article</button>
      </form>
    </div>
  );
};

export default WriteArticle;
