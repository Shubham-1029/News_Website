import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getArticlesByCategory } from '../api';
import PropTypes from 'prop-types';
import '../components/css/ArticlesByCategoryHomePage.css';

const ArticlesByCategoryHomePage = ({ category }) => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await getArticlesByCategory(category);
                setArticles(response.slice(0, 4)); // Display only the first 4 articles
            } catch (error) {
                console.error(`Failed to fetch articles for category ${category}`, error);
            }
        };

        fetchArticles();
    }, [category]);

    const IMG_BASE_URL = `http://localhost:8000`;

    return (
        <section className="articles-by-category-homepage">
            <h2>{category} &gt;</h2>
            <div className="articlescategory-container">
                {articles.map(article => (
                    <div key={article.id} className="article-card article-card1">
                        {article.image && (
                            <Link to={`/articles/${article.id}`}>
                                <img
                                    src={IMG_BASE_URL + article.image}
                                    alt={article.title}
                                    className="article-image1"
                                />
                            </Link>
                        )}
                        <div className="article-content1">
                            <Link to={`/articles/${article.id}`} className="article-link1">
                                <h3>{article.title}</h3>
                            </Link>
                            <p className="article-author1">By {article.user}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

ArticlesByCategoryHomePage.propTypes = {
    category: PropTypes.string.isRequired,
};

export default ArticlesByCategoryHomePage;
