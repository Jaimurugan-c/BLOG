import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "../api";

const BlogDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/posts/${id}`);
        setPost(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPost();
  }, [id]);

  if (!post) return <h2 className="text-center mt-5">Loading...</h2>;

  return (
    <div className="container mt-5">
      <h2>{post.title}</h2>
      <img src={post.image} alt={post.title} className="img-fluid my-3" />
      <p>{post.description}</p>
      <Link to="/blog" className="btn btn-warning">Back to Blog</Link>
    </div>
  );
};

export default BlogDetails;
