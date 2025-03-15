import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  // Simulating API calls
  const login = (email, password) => {
    if (email === "test@example.com" && password === "password") {
      setUser({ email });
      localStorage.setItem("user", JSON.stringify({ email }));
      toast.success("Logged in successfully! 🎉");
      navigate("/");
    } else {
      toast.error("Invalid credentials ❌");
    }
  };

  const register = (email, password) => {
    setUser({ email });
    localStorage.setItem("user", JSON.stringify({ email }));
    toast.success("Account created successfully! ✅");
    navigate("/");
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    toast.info("Logged out successfully! 👋");
    navigate("/");
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
