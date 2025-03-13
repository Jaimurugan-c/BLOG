import { Link } from "react-router-dom";
import { useState } from "react";
import "../assets/styles/Navbar.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navbar navbar-expand-lg  yellow">
      <div className="container">
        <Link className="navbar-brand" to="/">Our-Blog</Link>
        
        {/* Toggle Button for Small Screens */}
        <button 
          className="navbar-toggler" 
          type="button" 
          onClick={() => setIsOpen(!isOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}>
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/blog" onClick={() => setIsOpen(false)}>Blog</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login" onClick={() => setIsOpen(false)}>Login</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/signup" onClick={() => setIsOpen(false)}>Signup</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
