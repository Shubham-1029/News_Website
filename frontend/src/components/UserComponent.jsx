import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getUserDetails, getUserArticles, deleteArticle, updateArticleCategories } from '../api';
import '../components/css/UserComponent.css'; 

const UserComponent = () => {
    const [user, setUser] = useState({});
    const [articles, setArticles] = useState([]); 
    const token = localStorage.getItem('token');

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userDetails = await getUserDetails();
                setUser(userDetails);
            } catch (error) {
                console.error('Error fetching user details:', error);
            }
        };

        const fetchUserArticles = async () => {
            try {
                const userArticles = await getUserArticles();
                if (userArticles.articles && Array.isArray(userArticles.articles)) {
                    setArticles(userArticles.articles); 
                } else {
                    setArticles([]); 
                    console.error('Expected an array of articles but got:', userArticles);
                }
            } catch (error) {
                console.error('Error fetching user articles:', error);
            }
        };

        fetchUserData();
        fetchUserArticles();
    }, []);

    const handleDelete = async (articleId) => {
        if (window.confirm('Are you sure you want to delete this article?')) {
            try {
                await deleteArticle(articleId, token);
                setArticles(articles.filter(article => article.id !== articleId)); 
            } catch (error) {
                console.error('Failed to delete article', error);
            }
        }
    };

    const handleUpdateCategory = async (articleId, tags) => {
        try {
            await updateArticleCategories(articleId, tags);
            setArticles(articles.map(article => 
                article.id === articleId ? { ...article, tags } : article
            ));
        } catch (error) {
            console.error('Error updating article tags:', error);
        }
    };

    return (
        <div className="user-component">
            <h2>Welcome  {user.username}</h2>
            <h3>Your Articles</h3>
            <ul className="user-articles">
                {articles.map(article => (
                    <li key={article.id} className="user-article">
                        <Link to={`/articles/${article.id}`}>
                            <h4>{article.title}</h4>
                        </Link>
                        <button onClick={() => handleDelete(article.id)}>Delete</button>
                        <Link to={`/articles/${article.id}/edit`}>Edit</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserComponent;
