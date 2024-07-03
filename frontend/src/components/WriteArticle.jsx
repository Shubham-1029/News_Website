import{ useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:8000/api'; 

const WriteArticle = () => {
  const [formData, setFormData] = useState({ title: '', content: '', image: null });
  const token = localStorage.getItem('token');
  const handleChange = (e) => {
    if (e.target.name === 'image') {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const articleData = new FormData();
    articleData.append('title', formData.title);
    articleData.append('content', formData.content);
    if (formData.image) {
      articleData.append('image', formData.image);
    }

  //   try {
  //     const response = await axios.post(`${API_URL}/articles/`, articleData, {
  //       headers: {
  //         Authorization: `Token ${token}`,
  //         'Content-Type': 'multipart/form-data', 
  //       },
  //     });
  //     console.log(response.data);
  //     alert('Article posted successfully!');
  //     setFormData({ title: '', content: '', image: null });
  //   } catch (error) {
  //     console.error('Failed to post article', error);
  //     alert('Failed to post article');
  //   }
  try {
    const response = await axios.post(`${API_URL}/articles/`, articleData, {
      headers: {
        Authorization: `Token ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log('Request headers:', response.config.headers);
    console.log(response.data);
    alert('Article posted successfully!');
    setFormData({ title: '', content: '', image: null });
  } catch (error) {
    console.error('Failed to post article', error);
    alert('Failed to post article');
  }
   };
  

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="title" placeholder="Title" value={formData.title} onChange={handleChange} />
      <textarea name="content" placeholder="Content" value={formData.content} onChange={handleChange}></textarea>
      <input type="file" name="image" onChange={handleChange} />
      <button type="submit">Post Article</button>
    </form>
  );
};

export default WriteArticle;
