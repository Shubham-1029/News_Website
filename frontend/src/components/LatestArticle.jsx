import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLatestArticles } from '../api';
import '../components/css/LatestArticle.css'; // Import the CSS file

const LatestArticle = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchLatestArticles = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        console.error('No token found');
        return;
      }
      try {
        const response = await getLatestArticles(token);
        setArticles(response);
      } catch (error) {
        console.error('Failed to fetch latest articles', error);
      }
    };
    fetchLatestArticles();
  }, []);

  const IMG_BASE_URL = `http://localhost:8000`; 

  return (
    <div className="latest-articles">
      {articles?.map(article => (
        <div key={article.id} className="latest-article">
          {article.image && (
            <Link to={`/articles/${article.id}`}><img src={IMG_BASE_URL + article.image} alt={article.title} className="article-image" /></Link>
          )}
          <div className="article-content">
            <Link to={`/articles/${article.id}`} className="article-link"><h5>{article.title}</h5></Link>
          </div>
        </div>
      ))}
      <hr />
    </div>
  );
};

const MainContent = () => {
  return (
    <div className="main-content">
      <div className="latest-articles-right">
        <LatestArticle />
      </div>
    </div>
  );
};  

export default MainContent;
