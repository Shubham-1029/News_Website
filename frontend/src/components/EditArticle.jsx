import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditArticle = () => {
  const { id } = useParams();
  const [article, setArticle] = useState({ title: '', content: '', image: null, categories: [] });
  const [allCategories, setAllCategories] = useState([]);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/articles/${id}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        const fetchedArticle = response.data;

        const categories = Array.isArray(fetchedArticle.categories)
          ? fetchedArticle.categories.map(category => (typeof category === 'object' ? category.name : category))
          : [];

        setArticle({ ...fetchedArticle, categories });
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/categories/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setAllCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchArticle();
    fetchCategories();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setArticle((prevArticle) => ({
        ...prevArticle,
        image: files[0],
      }));
    } else {
      setArticle((prevArticle) => ({
        ...prevArticle,
        [name]: value,
      }));
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategories = Array.from(e.target.selectedOptions, (option) => option.value);
    setArticle((prevArticle) => ({
      ...prevArticle,
      categories: selectedCategories,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', article.title);
    formData.append('content', article.content);
    if (article.image) {
      formData.append('image', article.image);
    }
    formData.append('categories', JSON.stringify(article.categories));

    console.log('Form Data:', formData);

    try {
      const response = await axios.put(`http://localhost:8000/api/articles/${id}/`, formData, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Article updated successfully!');
      navigate(`/articles/${id}`);
    } catch (error) {
      console.error('Error updating article:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        alert(`Error: ${error.response.data.detail || 'Failed to update article'}`);
      }
    }
  };

  return (
    <div className="container-xxl mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="text-center mb-4">Edit Article</h2>
          <form onSubmit={handleSubmit} className="p-4">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={article.title}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter article title"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="content" className="form-label">Content</label>
              <textarea
                id="content"
                name="content"
                value={article.content}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter article content"
                rows="10"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">Image</label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="categories" className="form-label">Categories</label>
              <select
                multiple
                id="categories"
                name="categories"
                value={article.categories}
                onChange={handleCategoryChange}
                className="form-control"
              >
                {allCategories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary w-100">Update Article</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditArticle;
