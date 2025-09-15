import React, { createContext, useState, useContext } from "react";
import { loginUser, registerUser } from "../api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // ✅ Handle Login
  const login = async (email, password) => {
    try {
      const data = await loginUser(email, password);
      setUser(data.user); // backend se jo user aayega
      return true;
    } catch (error) {
      console.error("Login Error:", error.message);
      return false;
    }
  };

  // ✅ Handle Register
  const register = async (name, email, password) => {
    try {
      const data = await registerUser(name, email, password);
      setUser(data.user);
      return true;
    } catch (error) {
      console.error("Register Error:", error.message);
      return false;
    }
  };

  // ✅ Handle Logout
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
