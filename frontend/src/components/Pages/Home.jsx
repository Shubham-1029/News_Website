import { useState, useEffect } from 'react';
import ArticleList from '../ArticleList';
import LatestArticle from '../LatestArticle';
import ArticlesByTag from '../ArticlesByTag';
import { getArticles, getTags } from '../../api';
import './Home.css';

const Home = ({selectedTag}) => {
    const [articles, setArticles] = useState([]);
    const [tags, setTags] = useState([]);
    /* const [selectedTag, setSelectedTag] = useState(''); */

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const articlesData = await getArticles();
                setArticles(articlesData);
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };

        fetchArticles();
    }, []);

    useEffect(() => {
        const fetchTags = async () => {
            try {
                const tagsData = await getTags();
                setTags(tagsData);
            } catch (error) {
                console.error('Error fetching tags:', error);
            }
        };

        fetchTags();
    }, []);

    return (
        <div className="home">
            <main className="main-content">
                <div className="container-xxl content">
                    <div className="row main-container">
                        <div className="latest-articles col-md-9">
                            <LatestArticle articles={articles} />
                        </div>
                        <div className="article-list col-md-3">
                            <h1 className="sidebar-title">Latest from the Post</h1>
                            <ArticleList articles={articles} />
                        </div>
                    </div>
                    <div className="tagged-articles">
                        {selectedTag && <ArticlesByTag tag={selectedTag} />}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Home;
