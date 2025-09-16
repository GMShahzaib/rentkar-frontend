import axios from "axios";

// 🔗 Apna backend base URL yahan daalo (mobile app ke liye local IP use karo)
const API = axios.create({
  baseURL: "http://192.168.0.102:5000/api/auth", // 👈 apna IP + port lagao
});

// ✅ Register new user
export const registerUser = async (name, email, password) => {
  try {
    const res = await API.post("/register", { name, email, password });
    return res.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Something went wrong",
    };
  }
};

// ✅ Login user
export const loginUser = async (email, password) => {
  try {
    const res = await API.post("/login", { email, password });
    return res.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Something went wrong",
    };
  }
};

// ✅ Example: Send verification email (optional)
export const sendVerificationEmail = async (token) => {
  try {
    const res = await API.post(
      "/send-verification-email",
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return res.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Something went wrong",
    };
  }
};

// ✅ Example: Verify email (optional)
export const verifyEmail = async (token) => {
  try {
    const res = await API.post("/verify-email", { token });
    return res.data;
  } catch (error) {
    return {
      success: false,
      message: error.response?.data?.message || "Something went wrong",
    };
  }
};
