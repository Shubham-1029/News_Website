import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getPopularTags, getArticlesByTag } from '../api';

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
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container-fluid">
                <a className="navbar-brand" href="/">Home</a>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        {tags.map(tag => (
                            <li className="nav-item" key={tag.id}>
                                <button className="nav-link btn" onClick={() => handleTagClick(tag.name)}>{tag.name}</button>
                            </li>
                        ))}
                    </ul>
                    {isLoggedIn ? (
                        <button className="button-85" onClick={handleLogout}>Log Out</button>
                    ) : (
                        <button className="button-85" onClick={handleLogin}>Log In</button>
                    )}
                    <button className="button-22 mx-3 py-3">Subscribe</button>
                </div>
            </div>
        </nav>
    );
};

NavBar.propTypes = {
    onTagSelect: PropTypes.func.isRequired,
};

export default NavBar;
