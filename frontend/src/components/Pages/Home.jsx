import { useState, useEffect } from 'react';
import ArticleList from '../ArticleList';
import LatestArticle from '../LatestArticle';
import Footer from '../Footer'
import { getArticlesByTag, getArticles } from '../../api';
import './Home.css';

function Home() {
    const [articles, setArticles] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                let articlesData = [];

                if (selectedTags.length > 0) {
                    const tagNames = selectedTags.map(tag => tag.name);
                    articlesData = await getArticlesByTag(tagNames);
                } else {
                    articlesData = await getArticles();
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
        setSelectedTags([...selectedTags, tag]);
    };

    return (
        <div className="home">
            <main className="main-content">
                <div className="container">
                    <div className="row">
                        <div className="latest-articles col-md-10">
                            <LatestArticle articles={articles} />
                        </div>
                        <div className="article-list col-md-2">
                            <h2 className="sidebar-title text-center">Other Articles</h2>
                            <ArticleList articles={articles} />
                        </div>
                    </div>
                </div>
            </main>
            <Footer/>
        </div>
    );
}

export default Home;
