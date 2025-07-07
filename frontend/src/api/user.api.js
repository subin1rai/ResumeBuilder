import axiosInstance from "../lib/axios";

export const getUser = async () => {
  console.log("fafadasdadasdadads")
  const { data } = await axiosInstance.get("/auth/profile");
  return data;
};