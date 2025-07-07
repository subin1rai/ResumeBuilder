import axiosInstance from "../lib/axios";

import axios from "axios";

export const getUser = async () => {
  console.log("Starting getUser");
  const token = localStorage.getItem("token");

  try {
   const response = await axiosInstance.get("/auth/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      timeout: 5000, // 5 seconds timeout for safety
    });
    console.log("Response received:", response);
    return response.data;
  } catch (error) {
    console.error("Error in getUser:", error.response || error.message || error);
    throw error;
  }
};



export const registerUser = async (name, email, password, confirmPassword) => {
  const { data } = await axiosInstance.post("/auth/register", {
    name,
    email,
    password,
    confirmPassword,
  });
  return data;
};

export const loginUser = async (email, password) => {
  const { data } = await axiosInstance.post("/auth/login", { email, password });
  return data;
};
