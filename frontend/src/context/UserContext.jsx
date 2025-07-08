import React, { createContext, useEffect, useState } from "react";
import { getUser } from "../api/user.api";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token") || null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {

    if (user) return; 

    if (!token) {
      setLoading(false);
      return;
    }

    const fetchUser = async () => {
      try {
        const userData = await getUser(); 
        console.log("Fetched user response:", userData);
        setUser(userData);
      } catch (error) {
        console.error(
          "User not authenticated or error fetching user:",
          error.response || error.message || error
        );
        clearUser();
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [token]);

  const updateUser = (userData, tokenValue) => {
    setUser(userData);
    if (tokenValue) {
      setToken(tokenValue);
      localStorage.setItem("token", tokenValue);
    }
    setLoading(false);
  };

  const clearUser = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  return (
    <UserContext.Provider
      value={{
        user,
        token,
        loading,
        updateUser,
        clearUser,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;
