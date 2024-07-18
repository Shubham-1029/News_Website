import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getArticlesByTag } from '../api';
import '../components/css/ArticlesByTag.css'; // Import the CSS file

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
      <div className="article-by-tag-title">
        <span className="article-tag2">{tag}</span>
      </div>
      {articles.length === 0 && <p>No articles found for the tag: {tag}</p>}
      <div className="row">
        <div className="col-12 col-md-8 article-full-container">
          <div className="articles-container">
            {articles.map(article => (
              <div key={article.id} className="article-card article-card2">
                {article.image && (
                  <Link to={`/articles/${article.id}`}>
                    <figure>
                      <img src={IMG_BASE_URL + article.image} alt={article.title} className="article-tag-image" />
                    </figure>
                  </Link>
                )}
                <div className="article-content2">
                  <Link to={`/articles/${article.id}`} className="article-link article-link2">
                    <h3>{article.title}</h3>
                  </Link>
                  <p className="article-excerpt2">{article.excerpt || article.content.substring(0, 200) + '...'}</p>
                  <p className="article-author2">By {article.user}</p>
                  <p className="article-time2">{new Date(article.updated_at).toLocaleDateString()}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="d-none d-md-block col-md-4 ad-placeholder">
          <div className="placeholder-img">
            <h2>Placeholder Content</h2>
            <p>This is a placeholder for additional content, ads, or any other information you want to display here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ArticlesByTag;
