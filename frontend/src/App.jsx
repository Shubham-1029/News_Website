import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
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
import LatestArticle from './components/LatestArticle';
import ScrollToTop from './components/ScrollToTop';
import ArticlesByCategory from './components/ArticlesByCategory';
import { AuthProvider } from './components/context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
    const [selectedCategory, setSelectedCategory] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false)
    const [username, setUsername] = useState('Loading...');
    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    };

    const handleLogin = () => {
        setIsLoggedIn(true);
    };
    const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/user/', {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        const data = await response.json();
        setUsername(data.username);
      } catch (error) {
        console.error('Error fetching user:', error);
        setUsername('Error loading user');
      }
    };

    if (token) {
      fetchUser();
    } else {
      setUsername('Guest');
    }
  }, [token]);

    const handleCategorySelect = (category) => {
        setSelectedCategory(category);
    };
    return (
        <AuthProvider>
            <Router>
                <ScrollToTop />
                <NavBar onCategorySelect={handleCategorySelect} />
                <div className="container-fluid">
                    <div className="row h-100">
                        <div className="content col-12" style={{ background: "white" }}>
                            <Routes>
                                <Route path="/" element={<Home />} />
                                <Route path="/latest-articles" element={<LatestArticle />} />
                                <Route path="/articles" element={<ArticleList />} />
                                <Route path="/categories/:category" element={<ArticlesByCategory />} />
                                <Route path="/register" element={<AuthForm type="register" />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/articles/:id" element={<ArticleDetail />} />

                                <Route element={<ProtectedRoute />}>
                                    <Route path="/articles/:id/edit" element={<EditArticle />} />
                                    <Route path="/write" element={<WriteArticle />} />
                                    <Route path="/user" element={<UserComponent />} />
                                </Route>

                                <Route path="*" element={<Navigate to="/" />} />
                            </Routes>
                        </div>
                        <Footer />
                    </div>
                </div>
            </Router>
        </AuthProvider>
    );
};

export default App;
