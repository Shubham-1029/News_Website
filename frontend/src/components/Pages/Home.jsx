import { useState, useEffect } from 'react';
import ArticleList from '../ArticleList';
import LatestArticle from '../LatestArticle';
import ArticlesByCategory from '../ArticlesByCategory'; // Import the ArticlesByTag component
import { getArticlesByCategory, getArticles, getCategories } from '../../api'; // Import getTags API
import './Home.css';
import { assets } from '../../assets/asset';
import ArticlesByCategoryHomePage from '../ArticlesByCategoryHomePage';
import TrendingBar from '../TrendingBar';
import Header from '../Header';

function Home() {
    const [articles, setArticles] = useState([]);
    const [categories, setCategories] = useState([]); // State to store categories
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768); // State to track screen size

    /* useEffect(() => {
        const fetchArticles = async () => {
            try {
                const articlesData = await getArticles();
                setArticles(articlesData);
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };

        fetchArticles();
    }, []); */

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const categoriesData = await getCategories();
                setCategories(categoriesData);
            } catch (error) {
                console.error('Error fetching categories:', error);
            }
        };

        fetchCategories();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth < 768);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return (
        <div className="home">
            <main className="main-content">
            <Header />
                <TrendingBar/>
                <div className={`container-xxl content ${isSmallScreen ? '' : 'container-class'}`}>
                    {isSmallScreen ? (
                        <div className="main-container">
                            <div className="latest-articles">
                                <LatestArticle articles={articles} />
                            </div>
                            <div className="article-list">
                                <h1 className="sidebar-title">Latest from the Post &gt;</h1>
                                <ArticleList articles={articles} />
                            </div>
                        </div>
                    ) : (
                        <div className="row main-container">
                            <div className="latest-articles col-md-9">
                                <LatestArticle articles={articles} />
                            </div>
                            <div className="article-list col-md-3">
                                <h1 className="sidebar-title">Latest from the Post &gt;</h1>
                                <ArticleList articles={articles} />
                            </div>
                        </div>
                    )}
                    <div className="tagged-articles">
                        {categories.map(category => (
                            <ArticlesByCategoryHomePage key={category.id} category={category.name} />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Home;