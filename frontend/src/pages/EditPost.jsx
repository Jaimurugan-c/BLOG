import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../api";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`/posts/${id}`);
        setTitle(res.data.title);
        setDescription(res.data.description);
        setImage(res.data.image);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPost();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.put(`/posts/${id}`, { title, description, image }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      navigate("/blog");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Edit Blog Post</h2>
      <form onSubmit={handleUpdate}>
        <input type="text" className="form-control my-2" value={title} onChange={e => setTitle(e.target.value)} />
        <textarea className="form-control my-2" value={description} onChange={e => setDescription(e.target.value)} />
        <input type="text" className="form-control my-2" value={image} onChange={e => setImage(e.target.value)} />
        <button className="btn btn-warning">Update Post</button>
      </form>
    </div>
  );
};

export default EditPost;
