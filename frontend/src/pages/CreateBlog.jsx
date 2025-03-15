import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreateBlog = () => {
  const [blog, setBlog] = useState({ title: '', content: '', author: '', image: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/blogs', blog);
      navigate('/');
    } catch (error) {
      console.error('Error creating blog', error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create Blog</h2>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-3" name="title" placeholder="Title" onChange={handleChange} />
        <textarea className="form-control mb-3" name="content" placeholder="Content" onChange={handleChange}></textarea>
        <input className="form-control mb-3" name="author" placeholder="Author" onChange={handleChange} />
        <input className="form-control mb-3" name="image" placeholder="Image URL" onChange={handleChange} />
        <button type="submit" className="btn btn-success">Create</button>
      </form>
    </div>
  );
};

export default CreateBlog;
