import { useEffect, useState } from "react";
import axios from "../api";

const Blog = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios.get("/posts")
      .then(response => setPosts(response.data))
      .catch(error => console.log(error));
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-warning">Blog Posts</h1>
      <div className="row">
        {posts.map(post => (
          <div key={post._id} className="col-md-4">
            <div className="card">
              <img src={post.image} className="card-img-top" alt={post.title} />
              <div className="card-body">
                <h5 className="card-title">{post.title}</h5>
                <p className="card-text">{post.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
