import { useEffect, useState } from 'react';
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

export default EditArticle;
/*  import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';

const EditArticle = () => {
  const { id } = useParams(); // useParams hook to get the article id
  const [article, setArticle] = useState({ title: '', content: '' });

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
    console.log(id)
    try {
      await axios.put(`http://localhost:8000/api/articles/${id}/`, article);
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