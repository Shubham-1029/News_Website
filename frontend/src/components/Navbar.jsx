import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getPopularCategories, getUserDetails } from '../api';
import { Link, useNavigate } from 'react-router-dom';
import Sidebar from './Sidebar'; // Import the Sidebar component
import '../components/css/NavBar.css';

const NavBar = ({ onCategorySelect }) => {
    const [categories, setCategories] = useState([]);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false); // State for sidebar
    const [user, setUser] = useState(null);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const popularTags = await getPopularCategories();
                setCategories(popularTags);
            } catch (error) {
                console.error('Error fetching popular categories', error);
            }
        };
        fetchTags();

        const token = localStorage.getItem('token');
        setIsLoggedIn(!!token);
        
        if (token) {
            const fetchUser = async () => {
                try {
                    const userDetails = await getUserDetails();
                    setUser(userDetails);
                } catch (error) {
                    console.error('Error fetching user', error);
                }
            };
            fetchUser();
        }
    }, []);

    const handleLogin = () => {
        setIsLoggedIn(true);
        localStorage.setItem('token', 'yourAuthTokenHere');
        // Fetch user details after login
        getUserDetails().then(userDetails => {
            setUser(userDetails);
        }).catch(error => {
            console.error('Error fetching user', error);
        });
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        localStorage.removeItem('token');
        setUser(null);
    };

    const handleCategoryClick = (category) => {
        onCategorySelect(category);
        navigate(`/categories/${category}`);
        closeSidebar(); // Close the sidebar when a category is clicked
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen); // Toggle sidebar state
    };

    const closeSidebar = () => {
        setIsSidebarOpen(false); // Close the sidebar
    };

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                <div className="container-fluid">
                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="navbar-left">
                        <button onClick={toggleSidebar} style={{ border: 'none' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false" role="img">
                                <path fill="currentColor" fillRule="evenodd" d="M7 3H2v1h5zm2 9H2v1H9zM2 7.5h4v1H2zm9.561 1.126a2.333 2.333 0 1 0-1.596-4.385 2.333 2.333 0 0 0 1.596 4.385m2.335-3.332a3.334 3.334 0 0 1-1.585 4.093l1.15 3.16-.94.341-1.155-3.175a3.334 3.334 0 1 1 2.53-4.42Z" clipRule="evenodd"></path>
                            </svg>
                        </button>

                        <button>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false" role="img">
                                <path fill="currentColor" d="M7 3a1 1 0 1 1 2 0 1 1 0 0 1-2 0"></path>
                                <path fill="currentColor" fillRule="evenodd" d="M2.32 12c-.178.608-.32 1-.32 1h12s-.142-.392-.32-1c-.292-1.004-.68-2.6-.68-4 0-2.761-1.686-5-5-5S3 5.239 3 8c0 1.4-.388 2.996-.68 4m1.04 0h9.28q-.053-.195-.108-.407C12.274 10.595 12 9.25 12 8c0-1.182-.36-2.173-.992-2.857C10.388 4.471 9.418 4 8 4c-1.419 0-2.388.471-3.008 1.143C4.36 5.827 4 6.818 4 8c0 1.25-.274 2.595-.532 3.593q-.054.213-.109.407" clipRule="evenodd"></path>
                                <path fill="currentColor" d="M6 13a2 2 0 1 0 4 0H9a1 1 0 1 1-2 0z"></path>
                            </svg>
                        </button>
                    </div>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            {categories.map(category => (
                                <li className="nav-item" key={category.id}>
                                    <button className="nav-link" onClick={() => handleCategoryClick(category.name)}>{category.name}</button>
                                </li>
                            ))}
                        </ul>
                        <div className="d-flex align-items-center ms-auto">
                            <button className="btn-subscribe">Subscribe</button>
                            {isLoggedIn ? (
                                <div className="dropdown">
                                    <button className="dropbtn" onClick={toggleDropdown}>
                                        {user ? user.username : 'Loading...'}
                                    </button>
                                    <div className={`dropdown-content ${isDropdownOpen ? 'show' : ''}`}>
                                        <button className="btn-subscribe">Subscribe</button>
                                        <a href="#" onClick={handleLogout}>Sign out</a>
                                        <Link to={`/user`}>My Post</Link>
                                        <a href="#">Account Settings</a>
                                    </div>
                                </div>
                            ) : (
                                <button className="btn-signin" onClick={handleLogin}>Sign in</button>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
            <Sidebar isOpen={isSidebarOpen} closeSidebar={closeSidebar} />
        </>
    );
};

NavBar.propTypes = {
    onTagSelect: PropTypes.func.isRequired,
};

export default NavBar;
