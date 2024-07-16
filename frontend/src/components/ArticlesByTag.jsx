import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getArticlesByTag } from '../api';
import PropTypes from 'prop-types';
import '../components/css/ArticleByTag.css';

const ArticlesByTag = ({ tag }) => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await getArticlesByTag(tag);
                setArticles(response.slice(0, 4)); // Display only the first 4 articles
            } catch (error) {
                console.error(`Failed to fetch articles for tag ${tag}`, error);
            }
        };

        fetchArticles();
    }, [tag]);

    const IMG_BASE_URL = `http://localhost:8000`;

    return (
        <section className="articles-by-tag">
            <h2>{tag} &gt;</h2>
            <div className="articles-container">
                {articles.map(article => (
                    <div key={article.id} className="article-card">
                        {article.image && (
                            <Link to={`/articles/${article.id}`}>
                                <img
                                    src={IMG_BASE_URL + article.image}
                                    alt={article.title}
                                    className="article-image"
                                />
                            </Link>
                        )}
                        <div className="article-content">
                            <Link to={`/articles/${article.id}`} className="article-link">
                                <h3>{article.title}</h3>
                            </Link>
                            <p className="article-author">By {article.user}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

ArticlesByTag.propTypes = {
    tag: PropTypes.string.isRequired,
};

export default ArticlesByTag;
