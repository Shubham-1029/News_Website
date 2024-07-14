// NavBar.jsx
import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getPopularTags, getArticlesByTag } from '../api';
import '../components/css/NavBar.css';

const NavBar = ({ onTagSelect }) => {
    const [tags, setTags] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const popularTags = await getPopularTags();
                setTags(popularTags);
            } catch (error) {
                console.error('Error fetching popular tags', error);
            }
        };
        fetchTags();

        setIsLoggedIn(!!localStorage.getItem('token'));
    }, []);

    const handleLogin = () => {
        setIsLoggedIn(true);
        localStorage.setItem('token', 'yourAuthTokenHere');
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('token');
    };

    const handleTagClick = async (tag) => {
        try {
            const articles = await getArticlesByTag(tag);
            onTagSelect(articles);
        } catch (error) {
            console.error('Error fetching articles by tag', error);
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <div className="navbar-left">
                    
                </div>
                <div className="navbar-center">
                    <ul className="navbar-nav">
                        {tags.map(tag => (
                            <li className="nav-item" key={tag.id}>
                                <button className="nav-link btn" onClick={() => handleTagClick(tag.name)}>{tag.name}</button>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="navbar-right">
                    <a className="btn-subscribe">Subscribe</a>
                    {isLoggedIn ? (
                        <button className="btn-signin" onClick={handleLogout}>Sign Out</button>
                    ) : (
                        <button className="btn-signin" onClick={handleLogin}>Signin</button>
                    )}
                </div>
            </div>
        </nav>
    );
};

NavBar.propTypes = {
    onTagSelect: PropTypes.func.isRequired,
};

export default NavBar;
