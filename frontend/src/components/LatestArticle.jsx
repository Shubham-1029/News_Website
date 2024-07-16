import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getLatestArticles } from '../api';
import '../components/css/LatestArticle.css'; // Import the CSS file

const LatestArticle = () => {
  const [articles, setArticles] = useState([]);

  const truncateText = (text, maxLength) => {
    if (!text) return '';
    return text.length > maxLength ? text.substring(0, maxLength) + '...' : text;
  };

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
            <p className="article-excerpt">{article.excerpt || truncateText(article.content, 100)}</p>
            <p className='article-author'>By {article.user}</p>
            <p className='article-time'>{timeSince(article.updated_at)}</p> {/* Display the time since updated */}
            <br />
          </div>
        </div>
      ))}
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
