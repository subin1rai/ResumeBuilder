import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/user.api";
import Input from "./Input";

const Login = ({ setCurrentPage }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  //  login handler
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser(email, password);
      const { token, user } = response;

      if (token) {
        updateUser(user, token); 
        navigate("/dashboard");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Something went wrong, try again!"
      );
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded-lg">
      <div className="text-center mb-4">
        <h3 className="text-xl font-semibold">Welcome Back</h3>
        <p className="text-sm text-gray-600">
          Login to continue building your resume
        </p>
      </div>

      <form onSubmit={handleLogin} className="space-y-4">
        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email"
          placeholder="example@gmail.com"
          type="email"
        />
        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="********"
          type="password"
        />

        {error && (
          <div className="text-red-500 text-sm font-medium">{error}</div>
        )}

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
        >
          Login
        </button>

        <p className="text-sm text-center mt-4">
          Don't have an account?{" "}
          <button
            type="button"
            className="text-blue-600 hover:underline"
            onClick={() => setCurrentPage("register")}
          >
            Register
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
