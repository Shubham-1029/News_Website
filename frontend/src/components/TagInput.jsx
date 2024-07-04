import { useState } from 'react';
import PropTypes from 'prop-types';

const TagInput = ({ tags, setTags }) => {
  const [input, setInput] = useState('');

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      if (!tags.includes(input.trim())) {
        setTags([...tags, input.trim()]);
      }
      setInput('');
    }
  };

  const removeTag = (index) => {
    setTags(tags.filter((_, i) => i !== index));
  };

  return (
    <div className="tag-input">
      <ul className="tag-list">
        {tags.map((tag, index) => (
          <li key={index} className="tag">
            {tag}
            <button type="button" className="tag-remove-btn" onClick={() => removeTag(index)}>
              &times;
            </button>
          </li>
        ))}
      </ul>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        placeholder="Add a tag and press Enter"
      />
    </div>
  );
};

TagInput.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  setTags: PropTypes.func.isRequired,
};

export default TagInput;
