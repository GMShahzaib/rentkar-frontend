import { createContext, useContext, useState } from "react";
import api from "../services/api"; // ✅ yahan se APIs call hongi

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(false);

  // ✅ Register
  const register = async (name, email, password) => {
    try {
      setLoading(true);
      const res = await api.post("/auth/register", { name, email, password });
      alert(res.data.message || "User registered successfully!");
      return true;
    } catch (error) {
      alert(error.response?.data?.message || "Register failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Login
  const login = async (email, password) => {
    try {
      setLoading(true);
      const res = await api.post("/auth/login", { email, password });

      setUser(res.data.user);
      setToken(res.data.token);

      return true;
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // ✅ Logout
  const logout = () => {
    setUser(null);
    setToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
