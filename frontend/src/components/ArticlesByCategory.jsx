import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getArticlesByCategory } from '../api';
import '../components/css/ArticlesByCategory.css'; // Import the CSS file

const ArticlesByCategory = () => {
  const { category } = useParams();
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    const fetchArticles = async () => {
      if (category) {
        try {
          const articlesData = await getArticlesByCategory(category);
          setArticles(articlesData);
        } catch (error) {
          console.error('Failed to fetch articles by category', error);
        }
      }
    };

    fetchArticles();
  }, [category]);

  const IMG_BASE_URL = `http://localhost:8000`;

  return (
    <div className="articles-by-category container-xxl">
      <div className="article-by-category-title">
        <span className="article-category2">{category}</span>
      </div>
      {articles.length === 0 && <p>No articles found for the category: {category}</p>}
      <div className="row">
        <div className="col-12 col-md-8 article-full-container">
          <div className="articles-container">
            {articles.map(article => (
              <div key={article.id} className="article-card article-card2">
                {article.image && (
                  <Link to={`/articles/${article.id}`}>
                    <figure>
                      <img src={IMG_BASE_URL + article.image} alt={article.title} className="article-category-image" />
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

export default ArticlesByCategory;
