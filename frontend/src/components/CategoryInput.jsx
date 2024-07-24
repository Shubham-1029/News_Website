import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import 'bootstrap/dist/css/bootstrap.min.css';
import { getCategories } from '../api'; // Adjust the import path as necessary

const CategoryInput = ({ selectedCategories, setSelectedCategories }) => {
  const [categories, setCategories] = useState([]);
  const [input, setInput] = useState('');

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const fetchedCategories = await getCategories();
        setCategories(fetchedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && input.trim()) {
      e.preventDefault();
      if (!selectedCategories.includes(input.trim())) {
        setSelectedCategories([...selectedCategories, input.trim()]);
      }
      setInput('');
    }
  };

  const removeCategory = (index) => {
    setSelectedCategories(selectedCategories.filter((_, i) => i !== index));
  };

  const handleCategorySelect = (e) => {
    const selectedCategory = e.target.value;
    if (selectedCategory && !selectedCategories.includes(selectedCategory)) {
      setSelectedCategories([...selectedCategories, selectedCategory]);
    }
  };

  return (
    <div className="category-input mb-3">
      <ul className="category-list list-inline">
        {selectedCategories.map((category, index) => (
          <li key={index} className="category list-inline-item badge bg-primary me-2">
            {category}
            <button 
              type="button" 
              className="btn-close btn-close-white ms-1" 
              onClick={() => removeCategory(index)}
            ></button>
          </li>
        ))}
      </ul>
      <select className="form-select mb-2" onChange={handleCategorySelect}>
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category.id} value={category.name}>
            {category.name}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={handleKeyDown}
        className="form-control"
        placeholder="Add a category and press Enter"
      />
    </div>
  );
};

CategoryInput.propTypes = {
  selectedCategories: PropTypes.arrayOf(PropTypes.string).isRequired,
  setSelectedCategories: PropTypes.func.isRequired,
};

export default CategoryInput;
