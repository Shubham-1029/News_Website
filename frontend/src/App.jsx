import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import NavBar from './components/NavBar';
import Header from './components/Header';
import AuthForm from './components/Register';
import ArticleDetail from './components/ArticleDetail';
import WriteArticle from './components/WriteArticle';
import EditArticle from './components/EditArticle';
import Login from './components/Login';
import Home from './components/Pages/Home';
import UserComponent from './components/UserComponent';
import ArticleList from './components/ArticleList';
import './components/css/styles.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Footer from './components/Footer';
import ArticlePage from './components/Pages/ArticlePage';
import LatestArticle from './components/LatestArticle';
import ArticlesByTag from './components/ArticlesByTag';
import ScrollToTop from './components/ScrollToTop';

const App = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));
    const [articles, setArticles] = useState([]);
    const [selectedTag, setSelectedTag] = useState('');

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    const handleTagSelect = (tag) => {
        setSelectedTag(tag);
    };

    return (
        <Router>
            <ScrollToTop />
            <NavBar onTagSelect={handleTagSelect} />
            <div className="container-fluid">
                <div className="row h-100">
                    <Header />
                    <div className="content col-12" style={{ background: "white" }}>
                        <Routes>
                            {isLoggedIn ? (
                                <>
                                    <Route path="/" element={<Home selectedTag={selectedTag} />} />
                                    <Route path="/articles/:id/edit" element={<EditArticle />} />
                                    <Route path="/articles/:id" element={<ArticleDetail />} />
                                    <Route path="/write" element={<WriteArticle />} />
                                    <Route path="/user" element={<UserComponent />} />
                                    <Route path="/articles" element={<ArticleList articles={articles} />} />
                                    <Route path="/latest-articles" element={<LatestArticle articles={articles} />} />
                                    <Route path="/tags/:tag" element={<ArticlesByTag />} />
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
                    <Footer />
                </div>
            </div>
        </Router>
    );
};

export default App;
