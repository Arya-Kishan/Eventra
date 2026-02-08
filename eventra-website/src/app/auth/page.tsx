"use client";

import { loginUserApi } from "@/services/UserService";
import { useRouter } from "next/navigation";
import { useState, FormEvent } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    const data = await loginUserApi({ email, password, authType: "manual" });
    console.log(data);

    console.log("Login attempt:", { email, password });
    router.push("/home");
    setIsLoading(false);
  };

  return (
    <>
      <div className="min-h-screen relative flex items-center justify-center p-4 sm:p-8 bg-[#faf8f5]">
        {/* Background Pattern */}
        <div
          className="absolute -top-1/2 -right-[10%] w-[60%] h-[120%] pointer-events-none opacity-100"
          style={{
            background: `radial-gradient(circle at 20% 30%, rgba(212, 165, 116, 0.08) 0%, transparent 50%),
                        radial-gradient(circle at 80% 70%, rgba(138, 154, 126, 0.08) 0%, transparent 50%)`,
            animation: "floatPattern 20s ease-in-out infinite",
          }}
        />

        {/* Background Gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              "linear-gradient(135deg, transparent 0%, rgba(212, 165, 116, 0.03) 100%)",
          }}
        />

        <div className="grid lg:grid-cols-2 grid-cols-1 max-w-6xl w-full bg-white rounded-3xl overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08),0_0_0_1px_rgba(0,0,0,0.04)] relative z-10">
          {/* Left Side - Branding */}
          <div
            className="bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] p-8 sm:p-12 lg:p-16 flex items-center justify-center relative overflow-hidden"
            style={{ fontFamily: "'DM Sans', sans-serif" }}
          >
            {/* Animated background effect */}
            <div
              className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%]"
              style={{
                background:
                  "radial-gradient(circle, rgba(212, 165, 116, 0.1) 0%, transparent 70%)",
                animation: "floatPattern 15s ease-in-out infinite",
              }}
            />

            <div className="relative z-10 animate-[fadeInUp_0.8s_ease-out]">
              <h1
                className="text-4xl sm:text-5xl lg:text-6xl font-light text-[#faf8f5] mb-6 leading-tight tracking-tight"
                style={{ fontFamily: "'Cormorant Garamond', serif" }}
              >
                Welcome Back
              </h1>
              <p className="text-base sm:text-lg text-[#faf8f5]/70 leading-relaxed mb-10 max-w-md">
                Continue your journey with us. Sign in to access your
                personalized dashboard and unlock exclusive features.
              </p>
              <div
                className="w-24 h-0.5 bg-gradient-to-r from-[#d4a574] to-transparent"
                style={{ animation: "slideIn 1s ease-out 0.3s both" }}
              />
            </div>
          </div>

          {/* Right Side - Form */}
          <div className="p-8 sm:p-12 lg:p-16 flex items-center justify-center bg-white">
            <div
              className="w-full max-w-md animate-[fadeInUp_0.8s_ease-out_0.2s_both]"
              style={{ fontFamily: "'DM Sans', sans-serif" }}
            >
              <div className="mb-10">
                <h2
                  className="text-3xl sm:text-4xl font-normal text-[#1a1a1a] mb-2 tracking-tight"
                  style={{ fontFamily: "'Cormorant Garamond', serif" }}
                >
                  Sign In
                </h2>
                <p className="text-[#666] text-sm sm:text-base">
                  Enter your credentials to continue
                </p>
              </div>

              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                {/* Email Input */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-medium text-[#1a1a1a] tracking-wide"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    required
                    className="px-4 py-3.5 border-[1.5px] border-gray-200 rounded-xl text-sm sm:text-base transition-all duration-300 focus:outline-none focus:border-[#d4a574] focus:ring-4 focus:ring-[#d4a574]/10 placeholder:text-gray-400"
                  />
                </div>

                {/* Password Input */}
                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-[#1a1a1a] tracking-wide"
                  >
                    Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    required
                    className="px-4 py-3.5 border-[1.5px] border-gray-200 rounded-xl text-sm sm:text-base transition-all duration-300 focus:outline-none focus:border-[#d4a574] focus:ring-4 focus:ring-[#d4a574]/10 placeholder:text-gray-400"
                  />
                </div>

                {/* Remember Me & Forgot Password */}
                <div className="flex justify-between items-center -mt-2">
                  <label className="flex items-center gap-2 cursor-pointer text-sm text-[#666]">
                    <input
                      type="checkbox"
                      className="w-4 h-4 cursor-pointer accent-[#d4a574]"
                    />
                    <span>Remember me</span>
                  </label>
                  <a
                    href="#"
                    className="text-sm text-[#d4a574] font-medium hover:text-[#8a9a7e] transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="relative mt-2 px-6 py-4 bg-gradient-to-br from-[#1a1a1a] to-[#2a2a2a] text-white rounded-xl text-base font-semibold cursor-pointer transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_8px_20px_rgba(26,26,26,0.3)] active:translate-y-0 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none overflow-hidden group"
                >
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-3">
                      <span
                        className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full"
                        style={{ animation: "spin 0.8s linear infinite" }}
                      />
                      Signing in...
                    </span>
                  ) : (
                    "Sign In"
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
