import { useState } from "react";
import api from "../services/api";
import {useNavigate} from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState(" ");
  const [password, setPassword] = useState(" ");
  const handleSubmit = async() => {
    try{
      const response = await api.post("/login",{
        email,password
      });
      if(response.data.token){
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      }
    }catch(error){
      console.error(error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100">
      <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-slate-800">Task Manager</h1>
          <p className="mt-2 text-sm text-slate-500">
            Organize your work efficiently
          </p>
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
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Enter your password"
            className="w-full rounded-lg border border-slate-300 px-4 py-3 outline-none focus:border-blue-500"
          />
        </div>

        <div className="mb-6 flex items-center justify-between text-sm">
          <label className="flex items-center gap-2">
            <input type="checkbox" />
            Remember me
          </label>

          <a href="#" className="text-blue-600 hover:underline">
            Forgot Password?
          </a>
        </div>

        <button
          onClick={handleSubmit}
          className="w-full rounded-lg bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700"
        >
          Sign In
        </button>

        <p className="mt-6 text-center text-sm text-slate-600">
          Don't have an account?{" "}
          <span className="cursor-pointer text-blue-600 hover:underline">
            Register
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
