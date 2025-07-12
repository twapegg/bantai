"use client";
// This is a client component because it uses useState for password visibility toggle
import React, { useState } from "react";
import NavBar from "@/components/navbar";
import Link from "next/link";
import { Dawning_of_a_New_Day } from "next/font/google";
import { useRouter } from "next/navigation";

export default function Signup() {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    cpassword: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [cpasswordVisible, setCPasswordVisible] = useState(false);
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handlechange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password !== form.cpassword) {
      return setMessage("Passwords don't match");
    }

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Signup failed");
      } else {
        router.push("/dashboard");
      }
    } catch (err) {
      console.error(err);
      setMessage("Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center py-12">
      <NavBar />
      <div className="flex items-center justify-center w-full pt-16">
        <div
          className="flex w-full max-w-6xl mx-4 bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden backdrop-blur-sm"
          style={{ height: "700px" }}
        >
          <div className="flex flex-col flex-[1.3] bg-white items-center justify-center p-16">
            {/*Header of the signup */}
            <div className="mb-8 text-center">
              <h5 className="text-4xl font-bold mb-4 text-gray-900">
                Join <span className="text-[#03585F]">bant</span>.
                <span className="text-[#EE9471]">ai</span>
              </h5>
              <p className="text-lg text-gray-600">
                Create your account and start safeguarding
              </p>
            </div>

            {/*This is the initial form of the signup — left side of the card*/}
            <form onSubmit={handleSubmit} className="w-full max-w-lg space-y-6">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Username
                  </label>
                  <input
                    name="username"
                    placeholder="Choose a username"
                    onChange={handlechange}
                    value={form.username}
                    className="w-full px-4 py-4 text-gray-900 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#03585F] focus:border-transparent transition-all duration-300 placeholder-gray-500 shadow-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    name="email"
                    type="email"
                    placeholder="Enter your email"
                    onChange={handlechange}
                    value={form.email}
                    className="w-full px-4 py-4 text-gray-900 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#03585F] focus:border-transparent transition-all duration-300 placeholder-gray-500 shadow-sm"
                    required
                  />
                </div>

                {/* Password input with visibility toggle */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      name="password"
                      onChange={handlechange}
                      value={form.password}
                      type={passwordVisible ? "text" : "password"}
                      placeholder="Create a strong password"
                      className="w-full px-4 py-4 pr-12 text-gray-900 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#03585F] focus:border-transparent transition-all duration-300 placeholder-gray-500 shadow-sm"
                      required
                    />
                    <button
                      onClick={() => setPasswordVisible(!passwordVisible)}
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-4 focus:outline-none"
                    >
                      {passwordVisible ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-5 h-5 text-gray-500 hover:text-[#03585F] transition-colors"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-5 h-5 text-gray-500 hover:text-[#03585F] transition-colors"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Confirm Password input with visibility toggle */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      name="cpassword"
                      onChange={handlechange}
                      value={form.cpassword}
                      type={cpasswordVisible ? "text" : "password"}
                      placeholder="Confirm your password"
                      className="w-full px-4 py-4 pr-12 text-gray-900 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-[#03585F] focus:border-transparent transition-all duration-300 placeholder-gray-500 shadow-sm"
                      required
                    />
                    <button
                      onClick={() => setCPasswordVisible(!cpasswordVisible)}
                      type="button"
                      className="absolute inset-y-0 right-0 flex items-center pr-4 focus:outline-none"
                    >
                      {cpasswordVisible ? (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-5 h-5 text-gray-500 hover:text-[#03585F] transition-colors"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                      ) : (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth="1.5"
                          stroke="currentColor"
                          className="w-5 h-5 text-gray-500 hover:text-[#03585F] transition-colors"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M3.98 8.223A10.477 10.477 0 0 0 1.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.451 10.451 0 0 1 12 4.5c4.756 0 8.773 3.162 10.065 7.498a10.522 10.522 0 0 1-4.293 5.774M6.228 6.228 3 3m3.228 3.228 3.65 3.65m7.894 7.894L21 21m-3.228-3.228-3.65-3.65m0 0a3 3 0 1 0-4.243-4.243m4.242 4.242L9.88 9.88"
                          />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {message && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-2xl">
                  <div className="flex items-center">
                    <svg
                      className="w-5 h-5 text-red-500 mr-2"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="text-sm font-medium text-red-700">
                      {message}
                    </span>
                  </div>
                </div>
              )}

              {/*Signup button for form submission*/}
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-[#03585F] to-[#095c62] text-white font-bold py-4 rounded-2xl hover:from-[#095c62] hover:to-[#03585F] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98]"
              >
                Create Account
              </button>

              <div className="text-center">
                <span className="text-gray-600">Already have an account? </span>
                <Link
                  href="/auth/login"
                  className="text-[#03585F] hover:text-[#095c62] font-medium transition-colors"
                >
                  Sign In
                </Link>
              </div>
            </form>
          </div>

          {/*Right side of the card*/}
          <div className="flex flex-col flex-[0.7] items-center justify-center text-white p-12 bg-gradient-to-br from-[#03585F] via-[#41817C] to-[#538D84] relative overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/10"></div>
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32"></div>
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-24 -translate-x-24"></div>

            <div className="relative z-10 text-center">
              <div className="mb-8">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-4xl font-bold mb-4">Already a Member?</h2>
                <p className="text-xl text-white/90 mb-8 leading-relaxed">
                  Sign in to access your dashboard and continue protecting your
                  family.
                </p>
              </div>

              <Link
                className="inline-block bg-white/10 backdrop-blur-sm border-2 border-white/30 rounded-2xl px-8 py-4 font-bold text-lg hover:bg-white hover:text-[#03585F] transition-all duration-300 shadow-xl hover:shadow-2xl transform hover:scale-105 active:scale-95"
                href="/auth/login"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
