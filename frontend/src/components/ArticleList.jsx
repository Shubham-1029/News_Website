import { useState, useEffect } from 'react';
import { getArticles } from '../api';
import { Link } from 'react-router-dom';
import '../components/css/ArticleList.css'; // Import the CSS file

const ArticleList = () => {
  const [articles, setArticles] = useState([]);
  const timeSince = (date) => {
    const now = new Date();
    const updatedDate = new Date(date);
    const secondsPast = (now.getTime() - updatedDate.getTime()) / 1000;

    if (secondsPast < 60) {
        return `${Math.floor(secondsPast)} seconds ago`;
    }
    if (secondsPast < 3600) {
        return `${Math.floor(secondsPast / 60)} minutes ago`;
    }
    if (secondsPast <= 86400) {
        return `${Math.floor(secondsPast / 3600)} hours ago`;
    }
    if (secondsPast <= 604800) {
        return `${Math.floor(secondsPast / 86400)} days ago`;
    }
    if (secondsPast <= 2592000) {
        return `${Math.floor(secondsPast / 604800)} weeks ago`;
    }
    if (secondsPast <= 31536000) {
        return `${Math.floor(secondsPast / 2592000)} months ago`;
    }
    return `${Math.floor(secondsPast / 31536000)} years ago`;
  };

  useEffect(() => {
    const fetchArticles = async () => {
      const response = await getArticles();
      setArticles(response.data);
    };
    fetchArticles();
  }, []);

  return (
    <div className="article-list-container">
      <ul className="article-lists">
        <div className="article-cont">
          {articles.map(article => (
            <li key={article.id} className="article-container">
              <Link to={`/articles/${article.id}`}>
                <img src={article?.image} alt={article.title} className="image-responsive article-image-list" />
              </Link>
              <div className="article-content-list">
                <Link className="article-link" to={`/articles/${article.id}`}>
                  <h2 className="article-title">{article.title}</h2>
                  <p className='article-time'>{timeSince(article.updated_at)}</p> {/* Display the time since updated */}
                </Link>
              </div>
            </li>
          ))}
        </div>
      </ul>
    </div>
  );
};

export default ArticleList;
