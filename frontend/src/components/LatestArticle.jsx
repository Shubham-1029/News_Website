import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLatestArticles } from '../api';
import ArticleList from './ArticleList';

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

  return (
    <div className="latest-articles">
      <h1>Latest Post</h1>
      {articles.map(article => (
        <div key={article.id} className="latest-article">
          {article.image && (
            <img src={article.image} alt={article.title} />
          )}
          <h5>{article.title}</h5>
          <p>{article.excerpt}</p>
          <Link to={`/articles/${article.id}`} className="btn btn-primary">Read more</Link>
        </div>
      ))}
    </div>
  );
};

const MainContent = () => {
  return (
    <div className="main-content">
      <div className="article-list">
        <ArticleList />
      </div>
      <div className="latest-articles-right">
        <LatestArticle />
      </div>
    </div>
  );
};

export default MainContent;
