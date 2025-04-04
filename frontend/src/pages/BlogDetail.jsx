import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BlogDetail = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/blogs/${id}`)
      .then(res => setBlog(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!blog) return <h2>Loading...</h2>;

  return (
    <div className="container mt-5">
      <h2>{blog.title}</h2>
      <img src={blog.image} className="img-fluid" alt={blog.title} />
      <p>{blog.content}</p>
      <p><strong>Author:</strong> {blog.author}</p>
    </div>
  );
};

export default BlogDetail;
