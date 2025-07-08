import axiosInstance from "../lib/axios";

export const fetchResume = async ()=>{
 const token = localStorage.getItem("token");

  try {
   const response = await axiosInstance.get("/resume/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Response received:", response);
    return response.data;
  } catch (error) {
    console.error("Error in getResume:", error.response || error.message || error);
    throw error;
  }
}


export const createResume = async(title)=>{
 const token = localStorage.getItem("token");
 console.log(title);
  try {
   const response = await axiosInstance.post("/resume/create",{title}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("Response received:", response);
    return response.data;
  } catch (error) {
    console.error("Error in create resume:", error.response || error.message || error);
    throw error;
  }   
}