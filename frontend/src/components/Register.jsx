import React, { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import Input from "./Input"; // Capitalized
import { registerUser } from "../api/user.api";

const Register = ({ setCurrentPage }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      return setError("Passwords do not match!");
    }

    try {
      const response = await registerUser(name, email, password, confirmPassword);
      console.log(response);
    const token = response.token;
    const user = response.user;

    if (token) {
      localStorage.setItem("token", token);
      updateUser(user);
      navigate("/dashboard");
    }
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong, try again!");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 rounded-lg">
      <div className="text-center mb-4">
        <h3 className="text-xl font-semibold">Create Account</h3>
        <p className="text-sm text-gray-600">Join now to create AST friendly resume</p>
      </div>

      <form onSubmit={handleRegister} className="space-y-4">
        <Input
          value={name}
          onChange={({ target }) => setName(target.value)}
          label="Name"
          placeholder="John Doe"
          type="text"
        />
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
        <Input
          value={confirmPassword}
          onChange={({ target }) => setConfirmPassword(target.value)}
          label="Confirm Password"
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
          Create Account
        </button>

        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <button
            type="button"
            className="text-blue-600 hover:underline"
            onClick={() => setCurrentPage("login")}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default Register;
