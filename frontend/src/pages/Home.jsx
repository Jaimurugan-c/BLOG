import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container text-center mt-5">
      <h1 className="text-warning">Welcome to My Blog</h1>
      <p className="lead">Read the latest blog posts from our community.</p>
      <Link to="/blog" className="btn btn-warning">View Blogs</Link>
    </div>
  );
};

export default Home;
