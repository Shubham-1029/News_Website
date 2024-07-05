import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleDetail, postComment, updateArticleTags } from '../api';
import CommentList from './CommentList';
import TagInput from './TagInput'; // 

const ArticleDetail = () => {
  const { id } = useParams(); // useParams hook to get the article id
  const [article, setArticle] = useState(null);
  const [comment, setComment] = useState('');
  const [tags, setTags] = useState([]);
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchArticle = async () => {
      const response = await getArticleDetail(id);
      setArticle(response.data);
      setTags(response.data.tags || []);
    };
    fetchArticle();
  }, [id]);

  const handleCommentChange = (e) => {
    setComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      await postComment(id, { content: comment }, token);
      alert('Comment posted successfully!');
      setComment('');
    } catch (error) {
      console.error('Failed to post comment', error);
    }
  };

  const handleTagsUpdate = async () => {
    try {
      await updateArticleTags(id, { tags }, token);
      alert('Tags updated successfully!');
    } catch (error) {
      console.error('Failed to update tags', error);
    }
  };

  if (!article) return <div>Loading...</div>;

  return (
    <div className="container article-detail">
      <h1 className="text-uppercase text-center my-4">{article.title}</h1>
      <h6 className="text-muted">-By {article.user}</h6>
      {article.image && <img className="img-fluid article-image mb-3" src={article.image} alt={article.title} />}
      <p className="article-content">{article.content}</p>
      <TagInput tags={tags} setTags={setTags} />
      <button onClick={handleTagsUpdate} className="btn btn-secondary mt-2">Save Tags</button>
      <CommentList articleId={id} />
      <form onSubmit={handleCommentSubmit} className="comment-form mt-4">
        <div className="form-group">
          <textarea 
            className="form-control" 
            value={comment} 
            onChange={handleCommentChange} 
            placeholder="Write a comment"
          />
        </div>
        <button type="submit" className="btn btn-primary mt-2">Post Comment</button>
      </form>
    </div>
  );
};

export default ArticleDetail;
