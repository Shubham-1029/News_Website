import { useState, useEffect } from 'react';
import { getArticles } from '../api';
import { Link } from 'react-router-dom';
import '../components/css/ArticleList.css'; // Import the CSS file

const ArticleList = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await getArticles();
      setArticles(response.data);
    };
    fetchArticles();
  }, []);

  return (
    <div className="article-list-container">
      <ul className="article-list">
        {articles.map(article => (
          <li key={article.id} className="article-container">
            <Link to={`/articles/${article.id}`}>
              <img src={article?.image} alt={article.title} className="img-fluid article-image-list" />
            </Link>
            <div className="article-content-list">
              <Link className="article-link" to={`/articles/${article.id}`}>
                <h2 className="article-title">{article.title}</h2>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleList;
