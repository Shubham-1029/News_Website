import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getArticleDetail, updateArticleTags, getTags, deleteArticle } from '../api';
import '../components/css/ArticleDetail.css'

const ArticleDetail = () => {
  const { id } = useParams(); // useParams hook to get the article id
  const [article, setArticle] = useState(null);
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');
  const navigate= useNavigate();
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

  if (!article) return <div>Loading...</div>;

  /*  const IMG_BASE_URL = `http://localhost:8000`  */

  return (
    <div className="container article-detail">
      <h1 className="text-uppercase text-center my-4">{article.title}</h1>
      <h6 className="text-muted">-By {article.user}</h6>
      <div className='text-center'>
        {article.image && <img className="img-fluid article-image mb-3" src={article.image} alt={article.title} />}
      </div>
      <p className="article-content">{article.content}</p>
      <div className="tags-section">
        <h5>Tags</h5>
        <ul className="tags-list">
          {tags.map(tag => (
            <li key={tag} className="tag-item">
              {tag}
              <button className="btn btn-sm btn-danger ml-2" onClick={() => handleRemoveTag(tag)}>Remove</button>
            </li>
          ))}
        </ul>
        <div className="add-tag">
          <input
            type="text"
            className="form-control"
            placeholder="Add a tag"
            value={newTag}
            onChange={handleTagChange}
          />
          <button className="btn btn-primary mt-2 mx-3" onClick={handleAddTag}>Add Tag</button>
          <button className="btn btn-primary mt-2 mx-3" onClick={getTags}>View Tags</button> 
          <button className="btn btn-danger mt-2 mx-3" onClick={handleDelete}>Delete Article</button>
        </div>
      </div>
    </div>
  );
};

export default ArticleDetail;
