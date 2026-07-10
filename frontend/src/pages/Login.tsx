import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import api from "../services/api";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setSuccess("");
    setError("");

    try {
      setLoading(true);

      const response = await api.post("/login", {
        email,
        password,
      });

      setSuccess(response.data.message || "Login successful.");

      localStorage.setItem("token", response.data.token);

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);
    } catch (err) {
      if (axios.isAxiosError(err)) {
        setError(err.response?.data?.message || "Login failed.");
      } else {
        setError("Something went wrong.");
      }

      setTimeout(() => {
        setError("");
      }, 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">

        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-800">
            Task Manager
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Organize your work efficiently
          </p>
        </div>

        {success && (
          <div className="mb-4 rounded-lg bg-green-100 p-3 text-green-700">
            {success}
          </div>
        )}

        {error && (
          <div className="mb-4 rounded-lg bg-red-100 p-3 text-red-700">
            {error}
          </div>
        )}

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Email
          </label>

          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-6 flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Remember me
          </label>

          <button
            type="button"
            className="text-blue-600 hover:underline"
          >
            Forgot Password?
          </button>
        </div>

        <button
          disabled={loading}
          onClick={handleSubmit}
          className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>

        <p className="mt-6 text-center text-sm text-slate-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-blue-600 hover:underline"
          >
            Register
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Login;