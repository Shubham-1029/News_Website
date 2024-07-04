import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { getComments } from '../api';

const CommentList = ({ articleId }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const fetchComments = async () => {
      const response = await getComments(articleId);
      setComments(response.data);
    };
    fetchComments();
  }, [articleId]);

  return (
    <div>
      <h3>Comments</h3>
      {comments.map((comment) => (
        <div key={comment.id}>
          <p>{comment.content}</p>
          <small>By {comment.user}</small>
        </div>
      ))}
    </div>
  );
};

CommentList.propTypes = {
  articleId: PropTypes.string.isRequired
};

export default CommentList;
