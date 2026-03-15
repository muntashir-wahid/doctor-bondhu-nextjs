"use client";

import { userLogout } from "@/lib/actions/auth-actions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const LogoutPage = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 4;
      });
    }, 80);

    const logout = async () => {
      await userLogout();
      setLoading(false);
      setTimeout(() => router.push("/"), 1500);
    };
    logout();

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[oklch(0.97_0.01_195)] via-[oklch(0.99_0.005_220)] to-[oklch(0.96_0.015_160)] relative overflow-hidden">
      {/* Animated background blobs */}
      <div
        className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full opacity-20 animate-pulse"
        style={{
          background:
            "radial-gradient(circle, oklch(0.65 0.12 195), transparent 70%)",
          animationDuration: "3s",
        }}
      />
      <div
        className="absolute bottom-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full opacity-20 animate-pulse"
        style={{
          background:
            "radial-gradient(circle, oklch(0.7 0.1 160), transparent 70%)",
          animationDuration: "4s",
          animationDelay: "1s",
        }}
      />
      <div
        className="absolute top-[40%] right-[15%] w-[300px] h-[300px] rounded-full opacity-10 animate-pulse"
        style={{
          background:
            "radial-gradient(circle, oklch(0.65 0.08 230), transparent 70%)",
          animationDuration: "5s",
          animationDelay: "0.5s",
        }}
      />

      {/* Card */}
      <div
        className="relative z-10 bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl shadow-2xl px-12 py-14 flex flex-col items-center gap-6 min-w-[340px] max-w-sm"
        style={{ boxShadow: "0 8px 48px 0 oklch(0.55 0.12 195 / 0.15)" }}
      >
        {/* Icon */}
        <div className="relative flex items-center justify-center">
          <div
            className="w-20 h-20 rounded-full flex items-center justify-center"
            style={{
              background: loading
                ? "linear-gradient(135deg, oklch(0.55 0.12 195), oklch(0.65 0.08 230))"
                : "linear-gradient(135deg, oklch(0.7 0.1 160), oklch(0.55 0.12 195))",
              transition: "background 0.8s ease",
              boxShadow: loading
                ? "0 0 32px oklch(0.55 0.12 195 / 0.4)"
                : "0 0 32px oklch(0.7 0.1 160 / 0.4)",
            }}
          >
            {loading ? (
              /* Spinner */
              <svg
                className="w-9 h-9 text-white animate-spin"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <path
                  className="opacity-90"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>
            ) : (
              /* Checkmark */
              <svg
                className="w-9 h-9 text-white"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                style={{
                  animation: "pop-in 0.4s cubic-bezier(0.34,1.56,0.64,1) both",
                }}
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            )}
          </div>
        </div>

        {/* Text */}
        <div className="text-center space-y-2">
          <h1
            className="text-2xl font-bold tracking-tight"
            style={{ color: "oklch(0.25 0.015 240)" }}
          >
            {loading ? "Signing you out…" : "See you soon!"}
          </h1>
          <p className="text-sm" style={{ color: "oklch(0.5 0.02 220)" }}>
            {loading
              ? "Please wait while we securely end your session."
              : "You've been logged out. Redirecting to home…"}
          </p>
        </div>

        {/* Progress bar */}
        <div
          className="w-full h-1.5 rounded-full overflow-hidden"
          style={{ background: "oklch(0.92 0.01 220)" }}
        >
          <div
            className="h-full rounded-full transition-all duration-100 ease-linear"
            style={{
              width: `${progress}%`,
              background: loading
                ? "linear-gradient(90deg, oklch(0.55 0.12 195), oklch(0.65 0.08 230))"
                : "linear-gradient(90deg, oklch(0.7 0.1 160), oklch(0.55 0.12 195))",
            }}
          />
        </div>

        {/* Brand */}
        <p
          className="text-xs font-medium tracking-widest uppercase"
          style={{ color: "oklch(0.65 0.08 195)" }}
        >
          Doctor Bondhu
        </p>
      </div>

      <style jsx>{`
        @keyframes pop-in {
          0% {
            transform: scale(0) rotate(-20deg);
            opacity: 0;
          }
          100% {
            transform: scale(1) rotate(0deg);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default LogoutPage;
