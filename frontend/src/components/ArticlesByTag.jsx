import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useParams } from 'react-router-dom';
import { getArticlesByTag } from '../api';
import '../components/css/ArticlesByTag.css';  // Import the CSS file

const ArticlesByTag = () => {
  const { tag } = useParams();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      if (tag) {
        try {
          const articlesData = await getArticlesByTag(tag);
          setArticles(articlesData);
        } catch (error) {
          console.error('Failed to fetch articles by tag', error);
        }
      }
    };

    fetchArticles();
  }, [tag]);

  const IMG_BASE_URL = `http://localhost:8000`;

  return (
    <div className="articles-by-tag container-xxl">
      {articles.length === 0 && <p>No articles found for the tag: {tag}</p>}
      {articles.map(article => (
        <div key={article.id} className="article">
          {article.image && (
            <Link to={`/articles/${article.id}`}>
              <img src={IMG_BASE_URL + article.image} alt={article.title} className="article-image" />
            </Link>
          )}
          <div className="article-content">
            <Link to={`/articles/${article.id}`} className="article-link">
              <h5>{article.title}</h5>
            </Link>
            <p className="article-excerpt">{article.excerpt || article.content.substring(0, 100) + '...'}</p>
            <p className="article-author">By {article.user}</p>
            <p className="article-time">{new Date(article.updated_at).toLocaleDateString()}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

ArticlesByTag.propTypes = {
  tag: PropTypes.string.isRequired,
};

export default ArticlesByTag;
