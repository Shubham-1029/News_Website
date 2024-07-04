import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLatestArticles } from '../api';

const LatestArticle = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchLatestArticles = async () => {
      try {
        const response = await getLatestArticles(); 
        setArticles(response.data); 
      } catch (error) {
        console.error('Failed to fetch latest articles', error);
      }
    };

    fetchLatestArticles();
  }, []);

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Latest Articles</h2>
      <div className="row">
        {articles.map(article => (
          <div key={article.id} className="col-md-4 mb-4">
            <div className="card">
              {article.image && (
                <img className="card-img-top" src={article.image} alt={article.title} />
              )}
              <div className="card-body">
                <h5 className="card-title">{article.title}</h5>
                <p className="card-text">{article.excerpt}</p>
                <Link to={`/latest-articles/`} className="btn btn-primary">Read more</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestArticle;
