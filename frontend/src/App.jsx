import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import AuthForm from './components/Register';
import ArticleList from './components/ArticleList';
import ArticleDetail from './components/ArticleDetail';
import WriteArticle from './components/WriteArticle';
import EditArticle from './components/EditArticle';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Home from './components/Pages/Home';
import '../src/components/css/styles.css';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import MainContent from './components/LatestArticle';

const App = () => {
  const token = localStorage.getItem('token');
  const isLoggedIn = !!token; // Set isLoggedIn to false if token is null or undefined

  const handleLogout = () => {
    localStorage.removeItem('token');
  };

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
      <Routes>
        {isLoggedIn ? (
          <>
            <Route path="/" element={<MainContent/>} />
            <Route path="/articles/:id/edit" element={<EditArticle />} />
            <Route path="/articles/:id" element={<ArticleDetail />} />
            <Route path="/write" element={<WriteArticle />} />
          </>
        ) : (
          <>
            <Route path="/register" element={<AuthForm type="register" />} />
            <Route path="/login" element={<Login />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </Router>
  );
};

export default App;

