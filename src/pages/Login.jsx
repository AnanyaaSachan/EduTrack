import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { loginUser } from "../services/api";

function Login({ onLoadEnrollments }) {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "" });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim()) {
      setError("Please fill in all fields.");
      return;
    }
    try {
      const userData = await loginUser(form.name.trim(), form.email.trim());
      login(userData);
      await onLoadEnrollments(userData._id);
      navigate("/dashboard");
    } catch (err) {
      setError("Login failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 to-blue-600 flex items-center justify-center px-4 page-transition">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 flex flex-col gap-6">

        {/* Logo + Title */}
        <div className="text-center flex flex-col items-center gap-2">
          <img
            src="https://static.vecteezy.com/system/resources/previews/029/100/774/original/education-school-logo-element-free-vector.jpg"
            alt="EduTrack"
            className="h-14 w-14 rounded-full object-cover"
          />
          <h1 className="text-2xl font-extrabold text-gray-800">Welcome to EduTrack</h1>
          <p className="text-gray-500 text-sm">Sign in to continue your learning journey</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">Your Name</label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Ananya"
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-semibold text-gray-700">Email Address</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="e.g. ananya@email.com"
              className="border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
            />
          </div>

          {/* Error */}
          {error && (
            <p className="text-red-500 text-xs font-medium">{error}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 mt-1"
          >
            Sign In
          </button>
        </form>

        {/* Signup link */}
        <p className="text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link to="/signup" className="text-blue-600 font-semibold hover:underline">
            Sign Up
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Login;
