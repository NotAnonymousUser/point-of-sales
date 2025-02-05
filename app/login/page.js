"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import dynamic from 'next/dynamic';

const Lottie = dynamic(() => import('react-lottie-player'), {
  ssr: false
});

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [animationData, setAnimationData] = useState(null);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();
  const lottieRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    // Fetch the Lottie animation JSON
    fetch("/grass-mowing.json")
      .then((response) => response.json())
      .then((data) => setAnimationData(data))
      .catch((error) => console.error("Error loading animation:", error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    router.push("/dashboard");
  };

  if (!mounted) {
    return null;
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-100"
      style={{
        backgroundImage: "url('/bg-1.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Lottie Animation Background */}
      {mounted && animationData && (
        <div
          className="absolute inset-0"
          style={{
            zIndex: 1,
            pointerEvents: "none",
          }}
        >
          <Lottie
            ref={lottieRef}
            play
            animationData={animationData}
            style={{
              width: "100%",
              height: "140%",
              objectFit: "cover",
            }}
            loop={false}
            onComplete={() => {
              if (lottieRef.current && animationData) {
                const totalFrames = animationData.op;
                const stopFrame = Math.max(totalFrames - 10, 0);
                lottieRef.current.goToAndStop(stopFrame, true);
              }
            }}
          />
        </div>
      )}

      {/* Main Content Container */}
      <div className="flex flex-col items-center justify-center w-full max-w-6xl px-4 relative z-10">
        {/* Login Form */}
        <div className="bg-white border border-black shadow-lg shadow-green-700 p-8 rounded-lg w-full max-w-md">
          <img src="/full-logo.png" alt="Logo" className="mb-7 ml-8" />
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-gray-700">
                Username
              </label>
              <input
                id="username"
                type="text"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-800"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 text-gray-800"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="form-checkbox h-4 w-4 text-green-600"
                />
                <label htmlFor="remember" className="ml-2 text-gray-700">
                  Remember me
                </label>
              </div>
            </div>
            <div className="mt-8">
              <button
                type="submit"
                className="w-full mt-4 text-white py-2 rounded-lg bg-green-800 hover:bg-gray-400 duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
