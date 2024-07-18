// import { useState, useEffect } from 'react';
// import ArticleList from '../ArticleList';
// import LatestArticle from '../LatestArticle';
// import ArticlesByTag from '../ArticlesByTag';
// import { getArticles, getTags } from '../../api';
// import './Home.css';
// import ArticlesByTagHomePage from '../ArticlesByTagHomePage';

// const Home = ({selectedTag}) => {
//     const [articles, setArticles] = useState([]);
//     const [tags, setTags] = useState([]);
//     /* const [selectedTag, setSelectedTag] = useState(''); */

//     useEffect(() => {
//         const fetchArticles = async () => {
//             try {
//                 const articlesData = await getArticles();
//                 setArticles(articlesData);
//             } catch (error) {
//                 console.error('Error fetching articles:', error);
//             }
//         };

//         fetchArticles();
//     }, []);

//     useEffect(() => {
//         const fetchTags = async () => {
//             try {
//                 const tagsData = await getTags();
//                 setTags(tagsData);
//             } catch (error) {
//                 console.error('Error fetching tags:', error);
//             }
//         };

//         fetchTags();
//     }, []);

//     return (
//         <div className="home">
//             <main className="main-content">
//                 <div className="container-xxl content">
//                     <div className="row main-container">
//                         <div className="latest-articles col-md-9">
//                             <LatestArticle articles={articles} />
//                         </div>
//                         <div className="article-list col-md-3">
//                             <h1 className="sidebar-title">Latest from the Post</h1>
//                             <ArticleList articles={articles} />
//                         </div>
//                     </div>
//                     <div className="tagged-articles">
//                         {selectedTag && <ArticlesByTagHomePage tag={selectedTag} />}
//                     </div>
//                 </div>
//             </main>
//         </div>
//     );
// };

// export default Home;
import { useState, useEffect } from 'react';
import ArticleList from '../ArticleList';
import LatestArticle from '../LatestArticle';
import ArticlesByTag from '../ArticlesByTag'; // Import the ArticlesByTag component
import { getArticlesByTag, getArticles, getTags } from '../../api'; // Import getTags API
import './Home.css';
import { assets } from '../../assets/asset';
import ArticlesByTagHomePage from '../ArticlesByTagHomePage';

function Home() {
    const [articles, setArticles] = useState([]);
    const [tags, setTags] = useState([]); // State to store tags
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 768); // State to track screen size

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
                {/* <div className="ad-placeholder">
                    <img className="ad-placeholder-img" src={assets.image6} alt="Ad gif" />
                </div> */}
                
                <div className={`container-xxl content ${isSmallScreen ? '' : 'container-class'}`}>
                    {isSmallScreen ? (
                        <div className="main-container">
                            <div className="latest-articles">
                                <LatestArticle articles={articles} />
                            </div>
                            <div className="article-list">
                                <h1 className="sidebar-title">Latest from the Post</h1>
                                <ArticleList articles={articles} />
                            </div>
                        </div>
                    ) : (
                        <div className="row main-container">
                            <div className="latest-articles col-md-9">
                                <LatestArticle articles={articles} />
                            </div>
                            <div className="article-list col-md-3">
                                <h1 className="sidebar-title">Latest from the Post</h1>
                                <ArticleList articles={articles} />
                            </div>
                        </div>
                    )}
                    <div className="tagged-articles">
                        {tags.map(tag => (
                            <ArticlesByTagHomePage key={tag.id} tag={tag.name} />
                        ))}
                    </div>
                </div>
            </main>
        </div>
    );
}

export default Home;