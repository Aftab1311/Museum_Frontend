import { useState,useEffect } from "react";
import { motion } from "motion/react";
import { Landmark, Lock, Mail, Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL;

export default function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  
  const navigate = useNavigate();

  useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError("");
  };

 const handleSubmit = async (e) => {
  e.preventDefault();

  setLoading(true);
  setError("");

  try {
    const url = `${baseURL}/users/login`;

    const payload = {
      email: formData.email,
      password: formData.password,
    };

    const { data } = await axios.post(url, payload);
    if (!data) {
      throw new Error("No response from server");
    }

    // Persist the token for API calls
    const storage = rememberMe ? localStorage : sessionStorage;

    if (data.token) {
      localStorage.setItem("adminToken", data.token);
      storage.setItem("adminToken", data.token);
      // Ensure old storage doesn't keep it
      if (rememberMe) sessionStorage.removeItem("adminToken");
      else localStorage.removeItem("adminToken");
    }

    // Only admin users can access the admin panel
    if (data.role === "admin") {
      navigate("/admin");
    } else {
      setError("You are not authorized to access the admin dashboard.");
    }

  } catch (err) {
    console.error("Authentication error:", err);

    setError(
      err?.response?.data?.message ||
      err.message ||
      "Invalid email or password"
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[80vh] flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12"
    >
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-[2rem] shadow-sm border border-cultural-sand">
        <div className="text-center">
          <Landmark className="mx-auto h-12 w-12 text-[#5A5A40]" />
          <h2 className="mt-6 text-3xl font-serif text-cultural-ink">
            Welcome Back
          </h2>
          <p className="mt-2 text-sm text-[#5A5A40]">
            Sign in to access your account
          </p>
        </div>
        
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
            {error}
          </div>
        )}

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="email-address" className="block text-xs font-bold uppercase tracking-widest text-[#5A5A40] mb-1">
                Email address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="email-address"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleInputChange}
                  className="appearance-none rounded-xl relative block w-full pl-10 px-3 py-3 border border-cultural-sand bg-[#f5f5f0] placeholder-gray-500 text-cultural-ink focus:outline-none focus:ring-[#5A5A40] focus:border-[#5A5A40] focus:z-10 sm:text-sm transition-colors"
                  placeholder="Email address"
                  disabled={loading}
                />
              </div>
            </div>
            <div>
              <label htmlFor="password" className="block text-xs font-bold uppercase tracking-widest text-[#5A5A40] mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleInputChange}
                  className="appearance-none rounded-xl relative block w-full pl-10 px-3 py-3 border border-cultural-sand bg-[#f5f5f0] placeholder-gray-500 text-cultural-ink focus:outline-none focus:ring-[#5A5A40] focus:border-[#5A5A40] focus:z-10 sm:text-sm transition-colors"
                  placeholder="Password"
                  disabled={loading}
                  minLength={6}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-[#5A5A40] focus:ring-[#5A5A40] border-gray-300 rounded"
                disabled={loading}
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-cultural-ink">
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-[#5A5A40] hover:text-cultural-ink transition-colors">
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-full text-white bg-[#5A5A40] hover:bg-[#42422f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#5A5A40] transition-colors uppercase tracking-widest disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </button>
          </div>
        </form>
        
      </div>
    </motion.div>
  );
}