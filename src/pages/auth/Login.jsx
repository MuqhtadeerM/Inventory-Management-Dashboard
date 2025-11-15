import React, { useState } from "react";
import { Store, Eye, EyeOff, Lock, User as UserIcon } from "lucide-react";
import {
  authenticateUser,
  DEMO_USERS,
  saveUserToStorage,
} from "../../utils/authService";

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const user = await authenticateUser(username, password);

      // Optionally save to localStorage
      saveUserToStorage(user);

      // Call parent onLogin handler
      onLogin(user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const fillDemoCredentials = (role) => {
    const user = DEMO_USERS.find((u) => u.role === role);
    if (user) {
      setUsername(user.username);
      setPassword(user.password);
      setError("");
    }
  };

  return (
    <div className="min-h-screen bg-[#E31E24] flex items-center justify-center p-4">
      <div className="w-full max-w-md p-8 bg-white shadow-2xl rounded-2xl">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 bg-[#E31E24] rounded-full flex items-center justify-center mb-4 shadow-lg">
            <Store className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-[#E31E24] text-center">
            Coca-Cola Inventory System
          </h1>
          <p className="mt-2 text-sm text-gray-600">Please login to continue</p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="flex items-start gap-2 p-3 mb-4 text-sm text-red-700 bg-red-100 border border-red-400 rounded-lg">
            <svg
              className="w-5 h-5 flex-shrink-0 mt-0.5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Username */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Username
            </label>
            <div className="relative">
              <div className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2">
                <UserIcon className="w-5 h-5" />
              </div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter username"
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E31E24] focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Password
            </label>
            <div className="relative">
              <div className="absolute text-gray-400 -translate-y-1/2 left-3 top-1/2">
                <Lock className="w-5 h-5" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#E31E24] focus:border-transparent transition-all"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute text-gray-500 -translate-y-1/2 right-3 top-1/2 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#E31E24] text-white py-3 rounded-lg font-semibold hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="w-5 h-5 text-white animate-spin"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Logging in...
              </span>
            ) : (
              "Login"
            )}
          </button>
        </form>

        {/* Demo Credentials */}
        <div className="pt-6 mt-8 border-t border-gray-200">
          <p className="mb-3 text-sm font-semibold text-gray-700">
            Demo Credentials:
          </p>
          <div className="space-y-2 text-sm">
            <div className="flex items-center justify-between p-3 transition-all border border-purple-200 rounded-lg bg-gradient-to-r from-purple-50 to-purple-100 hover:from-purple-100 hover:to-purple-200">
              <div>
                <div className="font-semibold text-gray-800">Admin User</div>
                <div className="text-gray-600 text-xs mt-0.5">
                  admin / admin123
                </div>
              </div>
              <button
                type="button"
                onClick={() => fillDemoCredentials("Admin")}
                className="px-4 py-1.5 bg-[#E31E24] text-white rounded-md hover:bg-red-700 font-medium text-xs transition-colors"
              >
                Use
              </button>
            </div>

            <div className="flex items-center justify-between p-3 transition-all border border-blue-200 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 hover:from-blue-100 hover:to-blue-200">
              <div>
                <div className="font-semibold text-gray-800">Manager User</div>
                <div className="text-gray-600 text-xs mt-0.5">
                  manager / manager123
                </div>
              </div>
              <button
                type="button"
                onClick={() => fillDemoCredentials("Manager")}
                className="px-4 py-1.5 bg-[#E31E24] text-white rounded-md hover:bg-red-700 font-medium text-xs transition-colors"
              >
                Use
              </button>
            </div>

            <div className="flex items-center justify-between p-3 transition-all border border-green-200 rounded-lg bg-gradient-to-r from-green-50 to-green-100 hover:from-green-100 hover:to-green-200">
              <div>
                <div className="font-semibold text-gray-800">Sales User</div>
                <div className="text-gray-600 text-xs mt-0.5">
                  user / user123
                </div>
              </div>
              <button
                type="button"
                onClick={() => fillDemoCredentials("User")}
                className="px-4 py-1.5 bg-[#E31E24] text-white rounded-md hover:bg-red-700 font-medium text-xs transition-colors"
              >
                Use
              </button>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-6 text-center">
          <p className="text-xs text-gray-500">
            © 2025 Coca-Cola Inventory System. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
