import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Quill from 'quill';
import ImageResize from 'quill-image-resize';
import 'quill/dist/quill.snow.css';
import '../components/css/WriteArticle.css';

const API_URL = 'http://localhost:8000/api';

const WriteArticle = () => {
  const [formData, setFormData] = useState({ title: '', content: '', image: null, image_caption: '', categories: [] });
  const [allCategories, setAllCategories] = useState([]);
  const token = localStorage.getItem('token');
  const quillRef = useRef(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${API_URL}/categories/`, {
          headers: { Authorization: `Token ${token}` },
        });
        setAllCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
  
    fetchCategories();
  
    // Register Quill modules
    Quill.register('modules/imageResize', ImageResize);
  
    if (quillRef.current) {
      const quill = new Quill(quillRef.current, {
        theme: 'snow',
        modules: {
          toolbar: [
            [{ 'header': '1' }, { 'header': '2' }, { 'font': [] }],
            [{ size: [] }],
            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'indent': '-1' }, { 'indent': '+1' }],
            ['link', 'image', 'video'],
            ['clean']
          ],
          imageResize: {
            modules: ['Resize', 'DisplaySize', 'Toolbar']
          }
        },
        placeholder: 'Write the content of your article here...',
      });
  
      quill.on('text-change', () => {
        setFormData((prevData) => ({ ...prevData, content: quill.root.innerHTML }));
      });
    }
  }, [token]);
  

  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategories = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({ ...formData, categories: selectedCategories });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const articleData = new FormData();
    articleData.append('title', formData.title);
    articleData.append('content', formData.content);
    if (formData.image) {
      articleData.append('image', formData.image);
    }
    articleData.append('image_caption', formData.image_caption);
  
    formData.categories.forEach(category => {
      articleData.append('category_names', category);
    });
  
    try {
      const response = await axios.post(`${API_URL}/articles/`, articleData, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Article posted successfully!');
      setFormData({ title: '', content: '', image: null, image_caption: '', categories: [] });
    } catch (error) {
      console.error('Failed to post article:', error.response ? error.response.data : error.message);
      alert('Failed to post article. Please try again later.');
    }
  };
  
  return (
    <div className="container-xxl mt-5">
      <h1 className="text-center mb-4">Write an Article</h1>
      <form onSubmit={handleSubmit} className="bg-light p-4 rounded">
        <div className="form-group mb-3">
          <label htmlFor="title" className="form-label">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            className="form-control"
            placeholder="Title"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
        <hr />
        <div className="form-group mb-3">
          <label htmlFor="content" className="form-label">Content</label>
          <div ref={quillRef} style={{ height: '400px' }} />
        </div>
        <hr />
        <div className="form-group mb-3">
          <label htmlFor="image" className="form-label">Image</label>
          <input
            type="file"
            name="image"
            id="image"
            className="form-control"
            onChange={handleChange}
          />
        </div>
        <hr />
        <div className="form-group mb-3">
          <label htmlFor="image-caption" className="form-label">Image Caption</label>
          <input
            type="text"
            name="image_caption"
            id="image-caption"
            className="form-control"
            placeholder="Image Caption"
            value={formData.image_caption}
            onChange={handleChange}
          />
        </div>
        <hr />
        <div className="form-group mb-3">
          <label htmlFor="categories" className="form-label">Categories</label>
          <select
            name="categories"
            id="categories"
            className="form-control"
            multiple
            value={formData.categories}
            onChange={handleCategoryChange}
          >
            {allCategories.map((category) => (
              <option key={category.id} value={category.name}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <button type="submit" className="btn btn-secondary w-100">Post Article</button>
      </form>
    </div>
  );
};

export default WriteArticle;
