import { useState } from "react";
import axios from "../api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/auth/login", { email, password });
      localStorage.setItem("token", data.token);
      window.location.href = "/";
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input type="email" className="form-control my-2" placeholder="Email" onChange={e => setEmail(e.target.value)} />
        <input type="password" className="form-control my-2" placeholder="Password" onChange={e => setPassword(e.target.value)} />
        <button className="btn btn-warning">Login</button>
      </form>
    </div>
  );
};

export default Login;
