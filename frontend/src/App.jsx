import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthForm from './components/Register';
import ArticleList from './components/ArticleList';
import ArticleDetail from './components/ArticleDetail';
import WriteArticle from './components/WriteArticle';
import EditArticle from './components/EditArticle';
import Login from './components/Login';
import Header from './components/Header';
import Home from './components/Pages/Home';
import  '../src/components/css/styles.css';
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<AuthForm type="register" />} />
        <Route path="/login" element={<Login/>} />
        <Route path="/articles/:id/edit" element={<EditArticle />} />
        <Route path="/articles/:id" element={<ArticleDetail />} />
        <Route path="/write" element={<WriteArticle />} />
        <Route path="/" element={<Home/>} />
      </Routes>
    </Router>
  );
};

export default App;
