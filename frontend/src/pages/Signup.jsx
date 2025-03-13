import { useState } from "react";
import axios from "../api";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/signup", { name, email, password });
      window.location.href = "/login";
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" className="form-control my-2" placeholder="Name" onChange={e => setName(e.target.value)} />
        <input type="email" className="form-control my-2" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input type="password" className="form-control my-2" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button className="btn btn-warning">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
