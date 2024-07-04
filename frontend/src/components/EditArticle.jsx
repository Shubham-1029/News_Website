/* import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

const EditArticle = () => {
  const { id } = useParams(); // useParams hook to get the article id
  const [article, setArticle] = useState({ title: '', content: '' });
  const token= localStorage.getItem('token'); // Create a state variable for the token

  useEffect(() => {
    localStorage.setItem('token', token); // Update local storage when the token state changes
  }, [token]);

  useEffect(() => {
    const fetchArticle = async () => {
      console.log('Token:', token)
      try {
        const response = await axios.get(`http://localhost:8000/api/articles/${id}/`, {
           headers: { Authorization: `Bearer ${token}` },  // Send token in headers
        });
        setArticle(response.data);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    fetchArticle();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle((prevArticle) => ({
      ...prevArticle,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(id)
    try {
      await axios.put(`http://localhost:8000/api/articles/${id}/`, article);
    } catch (error) {
      console.error('Error updating article:', error);
    }
  };

  return (
    <div>
      <h2>Edit Article</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={article.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Content</label>
          <textarea
            name="content"
            value={article.content}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Article</button>
      </form>
    </div>
  );
};

EditArticle.propTypes = {
  id: PropTypes.string,
};
 
export default EditArticle;
*/
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditArticle = () => {
  const { id } = useParams();
  const [article, setArticle] = useState({ title: '', content: '' });
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/articles/${id}/`);
        setArticle(response.data);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    fetchArticle();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle((prevArticle) => ({
      ...prevArticle,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/articles/${id}/`, article, {
        headers: { Authorization: `Token ${token}` }
      });
      alert('Article updated successfully!');
      navigate(`/articles/${id}`);
    } catch (error) {
      console.error('Error updating article:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="text-center mb-4">Edit Article</h2>
          <form onSubmit={handleSubmit} className="p-4 border rounded shadow-sm">
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
            <button type="submit" className="btn btn-primary w-100">Update Article</button>
          </form>
        </div>
      </div>
    </div>
  );
};

EditArticle.propTypes = {
  id: PropTypes.string,
};

export default EditArticle;
/* import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

const EditArticle = () => {
  const { id } = useParams(); // useParams hook to get the article id
  const [article, setArticle] = useState({ title: '', content: '' });
  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    const fetchArticle = async () => {
      console.log('Token:', token)
      try {
        const response = await axios.get(`http://localhost:8000/api/articles/${id}/`, {
          headers: { Authorization: `Bearer ${token}` }, // Send token in headers
        });
        setArticle(response.data);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    fetchArticle();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setArticle((prevArticle) => ({
      ...prevArticle,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:8000/api/articles/${id}/`, article, {
        headers: { Authorization: `Bearer ${token}` }, // Send token in headers
      });
      // Handle successful update (e.g., redirect to article detail page)
    } catch (error) {
      console.error('Error updating article:', error);
    }
  };

  return (
    <div>
      <h2>Edit Article</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={article.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Content</label>
          <textarea
            name="content"
            value={article.content}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update Article</button>
      </form>
    </div>
  );
};

EditArticle.propTypes = {
  id: PropTypes.string,
};

export default EditArticle; */