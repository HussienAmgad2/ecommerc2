import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useAuth } from '../components/NavBar/AuthContext';
import { useUserToken } from '../components/context/UserTokenContext';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();
  const { token, setToken } = useUserToken();

  useEffect(() => {
    // إذا كان هناك توكن، قم بإعادة التوجيه إلى صفحة home
    if (token) {
      window.location.href = ("http://localhost:5173/home")
    }
  }, [token, navigate]);

  const handleLogin = async () => {
    setIsLoading(true);

    try {
      const response = await fetch("https://ecommerce.routemisr.com/api/v1/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        toast.error("Login failed. Please check your credentials.");
        throw new Error("Login failed");
      }

      const data = await response.json();

      if (data.token) {
        localStorage.setItem('token', data.token);
        login({ token: data.token });
        setToken(data.token);

        toast.success("Login successful!");
        window.location.href = ("http://localhost:5173/home")
      } else {
        toast.error("Login failed. No token received.");
      }
    } catch (error) {
      toast.error("An error occurred during login.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-500 h-full sm:w-[450px] lg:w-[600px] p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-6 md:p-8 dark:bg-gray-800 dark:border-gray-700 mx-auto mt-10">
      <ToastContainer />
      <form className="space-y-6">
        <h5 className="text-xl font-medium text-gray-900 dark:text-white">
          Sign in to our platform
        </h5>

        <div>
          <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="name@company.com"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
            Your password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
            placeholder="••••••••"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className="flex items-center justify-between">
          <a href="/forgot-password" className="text-sm text-blue-500 hover:underline dark:text-blue-500">
            Forgot Password?
          </a>
        </div>
        <button
          type="button"
          className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={handleLogin}
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : "Login to your account"}
        </button>

        <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
          Not registered? <a href="/signup" className="text-blue-700 hover:underline dark:text-blue-500">Create account</a>
        </div>
      </form>
    </div>
  );
}
