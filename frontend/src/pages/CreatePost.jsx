import { useState } from "react";
import axios from "../api";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post("/posts", { title, description, image }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      window.location.href = "/blog";
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Create a New Blog Post</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" className="form-control my-2" placeholder="Title" onChange={e => setTitle(e.target.value)} />
        <textarea className="form-control my-2" placeholder="Description" onChange={e => setDescription(e.target.value)} />
        <input type="text" className="form-control my-2" placeholder="Image URL" onChange={e => setImage(e.target.value)} />
        <button className="btn btn-warning">Create Post</button>
      </form>
    </div>
  );
};

export default CreatePost;
