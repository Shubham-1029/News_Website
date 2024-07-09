import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const DeleteArticle = () => {
  const [articles, setArticles] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:8000/api/articles/user/', {
          headers: { Authorization: `Token ${token}` }
        });
        setArticles(response.data.articles);
        setIsAdmin(response.data.is_admin);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };

    fetchArticles();
  }, [token]);

  const handleDelete = async (articleId) => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await axios.delete(`http://localhost:8000/api/articles/${articleId}/`, {
          headers: { Authorization: `Token ${token}` }
        });
        setArticles(articles.filter(article => article.id !== articleId));
        alert('Article deleted successfully!');
      } catch (error) {
        console.error('Error deleting article:', error);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">Delete Articles</h2>
      <div className="row">
        {articles.length === 0 ? (
          <p className="text-center">No articles available.</p>
        ) : (
          articles.map(article => (
            <div className="col-md-4 mb-4" key={article.id}>
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{article.title}</h5>
                  <p className="card-text">{article.content.substring(0, 100)}...</p>
                  {(isAdmin || article.user === token) && (
                    <button 
                      className="btn btn-danger w-100"
                      onClick={() => handleDelete(article.id)}
                    >
                      Delete
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DeleteArticle;
