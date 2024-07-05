import { useState, useEffect } from 'react';
import { getArticles } from '../api';
import { Link } from 'react-router-dom';

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
      <h1 className="text-center">Articles</h1>
      <ul className="article-list">
        {articles.map(article => (
          <li key={article.id} className="article-container">
            <Link to={`/articles/${article.id}`}>
              <img src={article.image} alt={article.title} className="img-fluid article-image-list" />
            </Link>
            <Link to={`/articles/${article.id}`}>
              <h2 className="article-title">{article.title}</h2>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ArticleList;
