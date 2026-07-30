import axiosInstance from "./axiosInstance";


// Register new customer/staff account
export const registerUser = async (data) => {
  return axiosInstance.post("/auth/register", data);
};


// Verify email OTP
export const verifyOtp = async (data) => {
  return axiosInstance.post("/auth/verify-otp", data);
};


// Login user and receive JWT token
export const loginUser = async (data) => {
  return axiosInstance.post("/auth/login", data);
};


// Get current logged-in user profile
export const getCurrentUser = async () => {
  return axiosInstance.get("/auth/me");
};


// Logout API (if backend supports it)
export const logoutUser = async () => {
  return axiosInstance.post("/auth/logout");
};