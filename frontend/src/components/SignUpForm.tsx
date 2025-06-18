"use client";
import React, { useState } from "react";
import AuthButton from "./AuthButton";
import { useRouter } from "next/navigation";
import { signUp } from "../../actions/auth";
import Link from "next/link";

const SignUpForm = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const result = await signUp(formData);

    if (result.status === "success") {
      router.push("/check-email");
    } else {
      setError(result.status);
    }

    setLoading(false);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const getPasswordStrength = (password: string) => {
    if (password.length === 0) return { strength: 0, label: "" };
    if (password.length < 6) return { strength: 1, label: "Weak" };
    if (password.length < 10) return { strength: 2, label: "Medium" };
    return { strength: 3, label: "Strong" };
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full mb-4 shadow-lg">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
          </svg>
        </div>
        <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">
          Create Account
        </h2>
        <p className="text-gray-600">Join us and start your journey today</p>
      </div>

      {/* Form Card */}
      <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 relative overflow-hidden">
        {/* Animated background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 via-blue-50/50 to-indigo-50/50 opacity-60"></div>

        <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
          {/* Username Field */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Username
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className={`w-5 h-5 transition-colors duration-200 ${focusedField === 'username' ? 'text-blue-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Enter your username"
                id="username"
                name="username"
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                onFocus={() => setFocusedField('username')}
                onBlur={() => setFocusedField(null)}
                className="w-full pl-10 pr-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 focus:bg-white transition-all duration-200 text-gray-800 font-medium placeholder-gray-400"
                required
              />
              <div className={`absolute inset-0 rounded-xl transition-all duration-200 pointer-events-none ${focusedField === 'username' ? 'ring-4 ring-blue-500/20' : ''}`}></div>
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Email Address
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className={`w-5 h-5 transition-colors duration-200 ${focusedField === 'email' ? 'text-blue-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                </svg>
              </div>
              <input
                type="email"
                placeholder="Enter your email"
                id="Email"
                name="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                onFocus={() => setFocusedField('email')}
                onBlur={() => setFocusedField(null)}
                className="w-full pl-10 pr-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 focus:bg-white transition-all duration-200 text-gray-800 font-medium placeholder-gray-400"
                required
              />
              <div className={`absolute inset-0 rounded-xl transition-all duration-200 pointer-events-none ${focusedField === 'email' ? 'ring-4 ring-blue-500/20' : ''}`}></div>
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Password
            </label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className={`w-5 h-5 transition-colors duration-200 ${focusedField === 'password' ? 'text-blue-500' : 'text-gray-400'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                type="password"
                placeholder="Create a strong password"
                name="password"
                id="password"
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                onFocus={() => setFocusedField('password')}
                onBlur={() => setFocusedField(null)}
                className="w-full pl-10 pr-4 py-3 bg-white/50 border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:ring-0 focus:bg-white transition-all duration-200 text-gray-800 font-medium placeholder-gray-400"
                required
              />
              <div className={`absolute inset-0 rounded-xl transition-all duration-200 pointer-events-none ${focusedField === 'password' ? 'ring-4 ring-blue-500/20' : ''}`}></div>
            </div>

            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="mt-2">
                <div className="flex items-center space-x-2">
                  <div className="flex-1 bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all duration-300 ${passwordStrength.strength === 1 ? 'bg-red-400 w-1/3' :
                          passwordStrength.strength === 2 ? 'bg-yellow-400 w-2/3' :
                            passwordStrength.strength === 3 ? 'bg-green-400 w-full' : 'w-0'
                        }`}
                    ></div>
                  </div>
                  <span className={`text-xs font-medium ${passwordStrength.strength === 1 ? 'text-red-500' :
                      passwordStrength.strength === 2 ? 'text-yellow-500' :
                        passwordStrength.strength === 3 ? 'text-green-500' : ''
                    }`}>
                    {passwordStrength.label}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-center space-x-3 animate-shake">
              <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <p className="text-red-700 font-medium">{error}</p>
            </div>
          )}

          {/* Submit Button */}
          <div className="pt-4">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-300"></div>
              <div className="relative">
                <AuthButton type="Sign up" loading={loading} />
              </div>
            </div>
          </div>

          {/* Additional Info */}
          <div className="text-center pt-4">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link href={"/signin"}>
                <span className="text-blue-600 font-semibold cursor-pointer hover:underline transition-all duration-200">
                  Sign in here
                </span>
              </Link>
            </p>
          </div>
        </form>

        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-200/30 to-transparent rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-purple-200/30 to-transparent rounded-full blur-2xl"></div>
      </div>

      {/* Footer */}
      <div className="text-center mt-6">
        <p className="text-xs text-gray-500">
          By signing up, you agree to our{" "}
          <span className="text-blue-600 hover:underline cursor-pointer">Terms of Service</span>
          {" "}and{" "}
          <span className="text-blue-600 hover:underline cursor-pointer">Privacy Policy</span>
        </p>
      </div>
    </div>
  );
};

export default SignUpForm;