import React, { useState } from "react";
import { EyeOff, Eye } from "lucide-react";
import { Edit, Check } from "lucide-react";

const Input = ({ value, onChange, label, placeholder, type = "text" }) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex flex-col">
      {label && (
        <label className="mb-1 text-sm font-medium text-start text-gray-700">
          {label}
        </label>
      )}
      <div className="relative">
        <input
          type={
            type === "password" ? (showPassword ? "text" : "password") : type
          }
          placeholder={placeholder}
          className="w-full border border-gray-300 rounded px-3 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500   "
          value={value}
          onChange={onChange}
        />
        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;


// for build
export const TitleInput = ({ title, setTitle }) => {
  const [editing, setEditing] = useState(false);
  const [focused, setFocused] = useState(false);
  return (
    <div className="flex items-center gap-3">
      {editing ? (
        <>
          <input
            type="text"
            placeholder="Resume title"
            className="text-lg sm:text-xl font-bold bg-transparent outline-none text-gray-800 border-b-2 pb-2 transition-all duration-300"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            autoFocus
          />
          <button className="p-2 rounded-xl bg-violet-500 hover:bg-violet-600 text-white transition-all" onClick={() => setEditing(false)}>
            <Check className="w-5 h-5" />
          </button>
        </>
      ) : (
        <>
          <h2 className="text-lg sm:text-xl font-bold text-gray-800">{title}</h2>
          <button className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all group" onClick={() => setEditing(true)}>
            <Edit className="w-5 h-5 text-gray-600 group-hover:text-violet-600 transition-colors" />
          </button>
        </>
      )}
    </div>
  );
};