import { useState } from "react";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    gender: "male",
    age: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.username || !formData.password || !formData.age) {
      alert("All fields are required!");
      return;
    }
    console.log("User Registered:", formData);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-r from-[#0f172a] to-[#1e293b] px-4">
      <div className="relative w-full max-w-md p-8 rounded-2xl bg-white/10 backdrop-blur-lg shadow-xl border border-white/20">
        
        {/* Glow Effect */}
        <div className="absolute inset-0 rounded-2xl shadow-lg bg-gradient-to-r from-indigo-500 to-blue-500 opacity-20 blur-xl"></div>

        {/* Title */}
        <h2 className="relative text-3xl font-extrabold text-center text-white tracking-wide font-serif">
          Sign Up
        </h2>

        {/* Avatar Placeholder */}
        <div className="relative flex justify-center mt-4">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-2xl font-semibold text-white shadow-md backdrop-blur-md">
            U
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="relative mt-6 space-y-5">
          
          {/* Username */}
          <div>
            <input
              type="text"
              name="username"
              placeholder="Enter Username"
              required
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-white/30 rounded-lg bg-white/10 text-white placeholder-gray-300 shadow-sm backdrop-blur-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              required
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-white/30 rounded-lg bg-white/10 text-white placeholder-gray-300 shadow-sm backdrop-blur-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            />
          </div>

          {/* Gender */}
          <div className="flex items-center justify-center space-x-6 font-medium text-gray-300">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === "male"}
                onChange={handleChange}
                className="accent-indigo-400"
              />
              <span>Male</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === "female"}
                onChange={handleChange}
                className="accent-pink-400"
              />
              <span>Female</span>
            </label>
          </div>

          {/* Age Selection */}
          <div>
            <select
              name="age"
              required
              value={formData.age}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-white/30 rounded-lg bg-white/10 text-white placeholder-gray-300 shadow-sm backdrop-blur-md focus:ring-2 focus:ring-indigo-400 focus:outline-none"
            >
              <option value="" disabled>Select Age Group</option>
              <option value="18-below">18 or Below</option>
              <option value="19-25">19 - 25</option>
              <option value="25-35">25 - 35</option>
              <option value="35-45">35 - 45</option>
              <option value="45-above">45 or Above</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-3 rounded-lg hover:bg-indigo-700 transition-all shadow-md font-semibold text-lg tracking-wide relative"
          >
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
}
