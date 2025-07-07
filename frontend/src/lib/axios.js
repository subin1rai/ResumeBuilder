
import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http:localhost:5000/api",
  withCredentials: true
});

// Response interceptor for handling errors
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    let errorMessage = "An unexpected error occurred";
    
    if (error.response) {
      // The server responded with a status code outside of 2xx range
      const { status, data } = error.response;
      
      switch (status) {
        case 400:
          errorMessage = data.message || "Bad request";
          break;
        case 401:
          errorMessage = "Unauthorized - Please login again";
          // You could redirect to login page or refresh token here
          break;
        case 403:
          errorMessage = "Forbidden - You don't have permission";
          break;
        case 404:
          errorMessage = data.message || "Resource not found";
          break;
        case 409:
          errorMessage = data.message || "Conflict occurred";
          break;
        case 500:
          errorMessage = "Server error - Please try again later";
          break;
        default:
          errorMessage = data.message || `Error ${status}`;
      }
    } else if (error.request) {
      // Request was made but no response received
      errorMessage = "No response from server - Please check your connection";
    } else {
      // Something happened in setting up the request
      errorMessage = error.message;
    }
    
    // You can log errors or show notifications here
    console.error("API Error:", errorMessage);
    
    // Add custom property to the error object
    error.customMessage = errorMessage;
    
    return Promise.reject(error);
  }
);

export default axiosInstance;
