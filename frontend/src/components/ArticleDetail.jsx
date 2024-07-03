import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getArticleDetail, postComment } from '../api';
import CommentList from './CommentList';

const ArticleDetail = () => {
  const { id } = useParams(); // useParams hook to get the article id
  const [article, setArticle] = useState(null);
  const [comment, setComment] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchArticle = async () => {
      const response = await getArticleDetail(id);
      setArticle(response.data);
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

  if (!article) return <div>Loading...</div>;

  return (
    <div>
      <h1>{article.title}</h1>
      <p>{article.content}</p>
      {article.image && <img src={article.image} alt={article.title} />}
      <CommentList articleId={id} />
      <form onSubmit={handleCommentSubmit}>
        <textarea value={comment} onChange={handleCommentChange} placeholder="Write a comment"></textarea>
        <button type="submit">Post Comment</button>
      </form>
    </div>
  );
};

export default ArticleDetail;
  