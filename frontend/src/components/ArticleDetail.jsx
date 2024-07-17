import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArticleDetail, updateArticleTags, deleteArticle } from '../api';
import '../components/css/ArticleDetail.css';

const ArticleDetail = () => {
  const { id } = useParams(); // useParams hook to get the article id
  const [article, setArticle] = useState(null);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await getArticleDetail(id);
        setArticle(response.data);
        setTags(response.data.tags.map(tag => tag.name) || []);
      } catch (error) {
        console.error('Failed to fetch article', error);
      }
    };
    fetchArticle();
  }, [id]);

  const handleTagChange = (e) => {
    setNewTag(e.target.value);
  };

  const handleAddTag = async () => {
    if (!newTag.trim()) return;

    const updatedTags = [...tags, newTag.trim()];
    try {
      await updateArticleTags(id, { tags: updatedTags }, token);
      setTags(updatedTags);
      setNewTag('');
    } catch (error) {
      console.error('Failed to update tags', error);
    }
  };

  const handleRemoveTag = async (tagToRemove) => {
    const updatedTags = tags.filter(tag => tag !== tagToRemove);
    try {
      await updateArticleTags(id, { tags: updatedTags }, token);
      setTags(updatedTags);
    } catch (error) {
      console.error('Failed to update tags', error);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this article?')) {
      try {
        await deleteArticle(id, token);
        navigate('/'); // Use navigate instead of history.push
      } catch (error) {
        console.error('Failed to delete article', error);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZoneName: 'short'
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
  };

  if (!article) return <div>Loading...</div>;

  return (
    <div className="container-xxl article-detail">
      <div className="row">
        <div className="col-9">
          <h1 className="article-detail-title mx-5 my-4">{article.title}</h1>
          <div className="article-actions-bar">
            <div className="listen-article">
              <div role="button" tabIndex="0" className="listen-button">
                <svg xmlns="http://www.w3.org/2000/svg" fill="$primary" viewBox="0 0 16 16" aria-hidden="true" focusable="false" role="img" className="listen-icon">
                  <path fillRule="evenodd" d="M12.967 7.527q.04.345.034.695v.558A3 3 0 0 0 11 8h-1v6h1a3 3 0 0 0 3-3c-.002-.102 0-.5 0-.5V8.24a6.13 6.13 0 0 0-1.695-4.343l-.016-.017A6.13 6.13 0 0 0 7.977 2a6.13 6.13 0 0 0-4.283 1.897A6.13 6.13 0 0 0 2 8.24v2.26a2 2 0 0 0 0 .5v.04A3 3 0 0 0 5 14h1V8H5a3 3 0 0 0-2 .78v-.558A5.12 5.12 0 0 1 4.428 4.57 5.12 5.12 0 0 1 7.995 3h.011a5.12 5.12 0 0 1 3.566 1.57l.014.014a5.12 5.12 0 0 1 1.381 2.943M3 10.131v.429l-.007.06a1 1 0 0 0 0 .26l.007.06V11a2 2 0 0 0 2 2V9a2 2 0 0 0-1.327.52zm10 0-.673-.611A2 2 0 0 0 11 9v4a2 2 0 0 0 2-1.997z" clipRule="evenodd"></path>
                </svg>
              </div>
              <div className="listen-time">7 min</div>

            </div>
            <button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:r0:" data-state="closed" aria-label="Share this article" className="share-news">
              <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16" aria-hidden="true" focusable="false" role="img" className="share-news-icon">
                <path fill="currentColor" d="M8 .6v3.8h.1c-4.4 0-7.3 4.5-6.9 8.8.1.8.2 1.2.2 1.2l.2 1 .4-1.3c.8-2 2-4 6.2-3.9H8v4l7-6.9zm1 11.3V9.3h-.9c-3 0-4.8.5-6.2 2.9.5-3.3 2.7-6.8 6.2-6.8H9V3l4.5 4.4z"></path>
              </svg>
            </button>
            <button type="button" aria-haspopup="dialog" aria-expanded="false" aria-controls="radix-:r1:" data-state="closed" aria-label="Save this article" className="save-article">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false" role="img" className="save-article-icon" data-bookmark-status="notsaved">
                <path d="M12 3v8.92l-3.38-2.7-.62-.5-.62.5L4 11.92V3zm1-1H3v12l5-4 5 4z"></path>
              </svg>
            </button>
            <button aria-label="Comment on this story" className="comments-button">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false" role="img" className="comments-button-icon">
                <path d="M14 14V2H2v9.47h8.18L12.43 13ZM3 10.52V3h10v9.23l-2.5-1.66Z"></path>
              </svg>
              <span style={{ color: 'gray', fontFamily: 'Times New Roman', fontSize: '0.87rem' }}>107</span>
            </button>
          </div>
          <div className="article-detail-image-container mb-4">
            {article.image && (
              <img
                className="img-fluid article-detail-image"
                src={article.image}
                alt={article.title}
              />
            )}
          </div>
          <div className="about-article">
            <p className="article-detail-author mx-3 px-3 mb-1">By {article.user}</p>
            <div className="article-time">
              <p className="article-detail-date mx-3 px-3 mb-4">Published {formatDate(article.created_at)}</p>
              <p className='article-detail-date mx-3 mb-4'>Updated {formatDate(article.updated_at)}</p>
            </div>
          </div>
        </div>
        <div className="ad-placeholder col-3">
          {/* Placeholder for advertisements */}
        </div>
      </div>
      <p className="article-contents">{article.content}</p>
    </div>
  );
};

export default ArticleDetail;
