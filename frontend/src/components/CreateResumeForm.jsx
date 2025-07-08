import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createResume } from "../api/reesume.api";
import Input from "./Input";
const CreateResumeForm = () => {
  const [title, setTitle] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  //create resume
  const handleCreateResume = async (e) => {
    e.preventDefault();
    if (!title) {
      setError("Please Enter title");
    }
    setError("");
    try {
      const response = await createResume(title);
      console.log("id", response.resume)
      if (response.resume.resumeId) {
        navigate(`/resume/${response.resume.resumeId}`);
      }
    } catch (error) {
      console.log(" Error creating resumes:", error);
    }
  };

  return (
    <div className="w-full max-w-md p-8 rounded-2xl border border-gray-100 ">
      <h3 className="text-2xl font-bold text-gray-900 mb-2">
        {" "}
        Create New Resume
      </h3>
      <p className="text-gray-600 mb-8">Give your resume a title!</p>
      <form onSubmit={handleCreateResume}>
        <Input
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          label="Resume Title"
          placeholder="Jhon Doe CV"
          type="text"
        />
        {error && <p className="text-red-500 text-sm md-4">{error}</p>}

        <button type="submit" className="w-full py-3 text-white bg-blue-400 mt-4 rounded-2xl bg-gradient-to-r from-blue-500 to-purple-600 font-black">
          Create Resume
        </button>
      </form>
    </div>
  );
};

export default CreateResumeForm;
