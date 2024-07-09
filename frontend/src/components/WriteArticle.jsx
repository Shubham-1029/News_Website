import { useState } from 'react';
import axios from 'axios';
import '../components/css/WriteArticle.css'

const API_URL = 'http://localhost:8000/api';

const WriteArticle = () => {
  const [formData, setFormData] = useState({ title: '', content: '', image: null, tags: '' });
  const token = localStorage.getItem('token');

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const articleData = new FormData();
    articleData.append('title', formData.title);
    articleData.append('content', formData.content);
    if (formData.image) {
      articleData.append('image', formData.image);
    }
    articleData.append('tags', formData.tags);

    try {
      const response = await axios.post(`${API_URL}/articles/`, articleData, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Request headers:', response.config.headers);
      console.log(response.data);
      alert('Article posted successfully!');
      setFormData({ title: '', content: '', image: null, tags: '' });
    } catch (error) {
      console.error('Failed to post article', error);
      alert('Failed to post article');
    }
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Write an Article</h1>
      <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
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
          <label htmlFor="tags" className="form-label">Tags</label>
          <input
            type="text"
            name="tags"
            id="tags"
            className="form-control"
            placeholder="Enter tags separated by commas"
            value={formData.tags}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-secondary w-100">Post Article</button>
      </form>
    </div>
  );
};

export default WriteArticle;