import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "../api";

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("/posts");
        setPosts(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPosts();
  }, []);

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`/posts/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPosts(posts.filter(post => post._id !== id));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Blog Posts</h2>
      <div className="row">
        {posts.map(post => (
          <div key={post._id} className="col-md-4">
            <div className="card mb-3">
              <img src={post.image} className="card-img-top" alt={post.title} />
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.description.substring(0, 100)}...</p>
                <Link to={`/blog/${post._id}`} className="btn btn-warning">Read More</Link>
                <Link to={`/edit/${post._id}`} className="btn btn-primary mx-2">Edit</Link>
                <button className="btn btn-danger" onClick={() => handleDelete(post._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
