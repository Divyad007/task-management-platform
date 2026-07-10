import { useState } from "react";
import api from "../services/api.ts";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpwd, setConfirmpwd] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const handleSubmit = async () => {
    setSuccess("");
    setError("");
    try {
      const res = await api.post("/register", {
        name,
        email,
        password,
        confirmpwd,
      });
      setSuccess(res.data.message);
      setTimeout(() => {
        setSuccess("");
        navigate("/");
      }, 2000);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError(error.response?.data.message || "Registeration failed");
        setTimeout(() => {
          setError("");
        }, 3000);
      } else {
        setError("Something went wrong");
        setTimeout(() => {
          setError("");
        }, 3000);
      }
    }
  };
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-800">Create Account</h1>
          {success && (
            <div className="mb-4 rounded bg-green-100 p-3 text-green-700">
              {success}
            </div>
          )}

          {error && (
            <div className="mb-4 rounded bg-red-100 p-3 text-red-700">
              {error}
            </div>
          )}

          <p className="mt-2 text-sm text-slate-500">
            Join Task Manager and organize your work
          </p>
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Name
          </label>
          <input
            onChange={(e) => {
              setName(e.target.value);
            }}
            type="text"
            placeholder="Enter your name"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-4">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Email
          </label>
          <input
            type="email"
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
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Create a password"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-6">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Confirm Password
          </label>
          <input
            type="password"
            onChange={(e) => setConfirmpwd(e.target.value)}
            placeholder="Confirm your password"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <button
          onClick={handleSubmit}
          className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Create Account
        </button>

        <p className="mt-6 text-center text-sm text-slate-600">
          Already have an account?{" "}
          <Link to="/" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
