import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { getPopularTags } from './api'; // adjust the path if necessary
import NavBar from './components/Navbar';
import SideBar from './components/SideBar';
import Header from './components/Header'; // Include Header component
import AuthForm from './components/Register';
import ArticleDetail from './components/ArticleDetail';
import WriteArticle from './components/WriteArticle';
import EditArticle from './components/EditArticle';
import Login from './components/Login';
import './components/css/styles.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Home from './components/Pages/Home';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const [tags, setTags] = useState([]);

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
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    return (
        <Router>
            <NavBar tags={tags} onTagSelect={(tagName) => console.log(`Selected tag: ${tagName}`)} /> {/* Include NavBar */}
            <div className="container-fluid">
                <div className="row">
                    <div className="sidebar">
                       {/*  <SideBar isLoggedIn={isLoggedIn} onLogout={handleLogout} /> */} {/* Include SideBar */}
                    </div>
                    <Header /> {/* Include Header component */}
                    <div className="content">
                        <Routes>
                            {isLoggedIn ? (
                                <>
                                    <Route path="/" element={<Home />} />
                                    <Route path="/articles/:id/edit" element={<EditArticle />} />
                                    <Route path="/articles/:id" element={<ArticleDetail />} />
                                    <Route path="/write" element={<WriteArticle />} />
                                </>
                            ) : (
                                <>
                                    <Route path="/register" element={<AuthForm type="register" />} />
                                    <Route path="/login" element={<Login onLogin={handleLogin} />} />
                                    <Route path="*" element={<Navigate to="/login" />} />
                                </>
                            )}
                        </Routes>
                    </div>
                </div>
            </div>
        </Router>
    );
};

export default App;
