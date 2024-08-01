import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState, useEffect, useRef } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Quill from 'quill';
import 'quill/dist/quill.snow.css';
import '../components/css/EditArticle.css';
import Header from './Header';

const EditArticle = () => {
  const { id } = useParams();
  const [article, setArticle] = useState({ title: '', subheading: '', content: '', image: null, categories: [] });
  const [allCategories, setAllCategories] = useState([]);
  const [imageURL, setImageURL] = useState('');
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const quillRef = useRef(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/articles/${id}/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        const fetchedArticle = response.data;
        const categories = Array.isArray(fetchedArticle.category_names)
          ? fetchedArticle.category_names
          : [];
        setArticle({ ...fetchedArticle, categories });

        setImageURL(fetchedArticle.image);

        // Initialize Quill with the fetched content
        if (quillRef.current) {
          const quill = quillRef.current;
          quill.root.innerHTML = fetchedArticle.content;
        }

        if (fetchedArticle.image) {
          const imageResponse = await fetch(fetchedArticle.image);
          const imageBlob = await imageResponse.blob();
          const imageFile = new File([imageBlob], fetchedArticle.image.split('/').pop(), { type: imageBlob.type });
          setArticle((prevArticle) => ({
            ...prevArticle,
            image: imageFile,
          }));
          if (fileInputRef.current) {
            fileInputRef.current.files = createFileList(imageFile);
          }
        }
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/categories/`, {
          headers: {
            Authorization: `Token ${token}`,
          },
        });
        setAllCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchArticle();
    fetchCategories();

    // Initialize Quill editor
    const quill = new Quill('#editor', {
      theme: 'snow',
      modules: {
        toolbar: [
          [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
          [{ size: [] }],
          ['bold', 'italic', 'underline', 'strike', 'blockquote'],
          [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'indent': '-1'}, { 'indent': '+1' }],
          ['link', 'image', 'video'],
          ['clean']
        ],
      },
    });
    quillRef.current = quill;
  }, [id, token]);

  const createFileList = (file) => {
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file);
    return dataTransfer.files;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setArticle((prevArticle) => ({
        ...prevArticle,
        image: files[0],
      }));
      setImageURL(URL.createObjectURL(files[0]));
    } else {
      setArticle((prevArticle) => ({
        ...prevArticle,
        [name]: value,
      }));
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategories = Array.from(e.target.selectedOptions, (option) => option.value);
    setArticle((prevArticle) => ({
      ...prevArticle,
      categories: selectedCategories,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', article.title);
    if(article.subheading){
      formData.append('subheading', article.subheading); 
    }
    formData.append('content', quillRef.current.root.innerHTML);
    if (article.image) {
      formData.append('image', article.image);
    }

    article.categories.forEach((category, index) => {
      formData.append(`category_names[${index}]`, category);
    });

    try {
      const response = await axios.put(`http://localhost:8000/api/articles/${id}/`, formData, {
        headers: {
          Authorization: `Token ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      alert('Article updated successfully!');
      navigate(`/articles/${id}`);
    } catch (error) {
      console.error('Error updating article:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
        alert(`Error: ${error.response.data.detail || 'Failed to update article'}`);
      }
    }
  };

  return (
    <div className="container-xxl mt-5">
      <Header/>
      <div className="row justify-content-center">
        <div className="col-md-8">
          <h2 className="edit-title text-center mb-4">Edit Article</h2>
          <form onSubmit={handleSubmit} className="p-4">
            <div className="mb-3">
              <label htmlFor="title" className="form-label">Title</label>
              <input
                type="text"
                id="title"
                name="title"
                value={article.title}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter article title"
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="subheading" className="form-label">Subheading</label>
              <input
                type="text"
                id="subheading"
                name="subheading"
                value={article.subheading}
                onChange={handleChange}
                className="form-control"
                placeholder="Enter article subheading"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="content" className="form-label">Content</label>
              <div id="editor" className="form-control" style={{ minHeight: '200px' }}></div>
            </div>
            <div className="mb-3">
              <label htmlFor="image" className="form-label">Image</label>
              <input
                type="file"
                id="image"
                name="image"
                onChange={handleChange}
                className="form-control"
                ref={fileInputRef}
              />
              {imageURL && (
                <div className="mt-2">
                  <img src={imageURL} alt="Article Thumbnail" style={{ width: '25%', maxHeight: '200px', objectFit: 'cover' }} />
                </div>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="categories" className="form-label">Categories</label>
              <select
                multiple
                id="categories"
                name="categories"
                value={article.categories}
                onChange={handleCategoryChange}
                className="form-control"
              >
                {allCategories.map((category) => (
                  <option key={category.id} value={category.name}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="btn btn-primary w-100">Update Article</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditArticle;
