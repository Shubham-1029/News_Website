import { useState, useEffect } from 'react';
import ArticleList from '../ArticleList';
import NavBar from '../NavBar';
import Footer from '../Footer';
import LatestArticle from '../LatestArticle';
import { getArticlesByTag, getArticles } from '../../api';
import './Home.css';
import Header from '../Header';
import SideBar from '../SideBar';

function Home() {
    const [articles, setArticles] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                let articlesData = [];

                if (selectedTags.length > 0) {
                    // Construct an array of tag names
                    const tagNames = selectedTags.map(tag => tag.name);
                    articlesData = await getArticlesByTag(tagNames);
                } else {
                    articlesData = await getArticles(); // Fetch latest articles or all articles
                }

                setArticles(articlesData);
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };

        fetchArticles();
    }, [selectedTags]);

    const handleTagSelect = (tag) => {
        console.log('Tag selected:', tag);
        setSelectedTags([...selectedTags, tag]); // Add selected tag to the array
    };

    return (
        <div className="home">
            <SideBar />
            <main className="main-content">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8">
                            <LatestArticle articles={articles} />
                        </div>
                        <div className="col-md-4">
                            <h2 className="sidebar-title text-center">Other Articles</h2>
                            <ArticleList articles={articles} />
                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}

export default Home;
