import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
} from "lucide-react";
import { motion } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "../components/ThemeToggle";

export default function LoginPage() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();

  const [email, setEmail] = useState("admin@drivewise.com");
  const [password, setPassword] = useState("123456");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();

    setError("");

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (!password.trim()) {
      setError("Please enter your password.");
      return;
    }

    try {
      const result = await login({
        email: email.trim(),
        password,
      });

      console.log("LOGIN RESULT:", result);

      if (result?.success) {
        navigate(result.user.role === "admin" ? "/admin" : "/dashboard", {
          replace: true,
        });
      } else {
        setError("Login failed. Please try again.");
      }
    } catch (error) {
      console.error("LOGIN ERROR:", error);
      setError(
        error?.message || "Unable to authenticate."
      );
    }
  };

  return (
    <div className="min-h-screen bg-executive-950 text-white">

      <div className="grid min-h-screen lg:grid-cols-2">

        {/* =================================================
            LEFT IMAGE
        ================================================= */}

        <div className="relative hidden overflow-hidden lg:block">

          <img
            src="https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&w=1800&q=85"
            alt="Luxury vehicle"
            className="absolute inset-0 h-full w-full object-cover"
          />

          <div className="absolute inset-0 bg-black/50" />

          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/30 to-transparent" />

          <div className="relative z-10 flex min-h-screen flex-col justify-between p-12">

            {/* LOGO */}

            <div>
              <div className="flex items-center gap-3">

                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-gold-500/40 bg-black/30">

                  <span className="font-serif text-xl text-gold-400">
                    DW
                  </span>

                </div>

                <div>

                  <h1 className="font-semibold tracking-[0.25em]">
                    DRIVEWISE
                  </h1>

                  <p className="text-[10px] uppercase tracking-[0.35em] text-gold-400">
                    Executive Academy
                  </p>

                </div>

              </div>
            </div>

            {/* HERO TEXT */}

            <div className="max-w-xl">

              <p className="mb-5 text-xs uppercase tracking-[0.35em] text-gold-400">
                Precision • Performance • Confidence
              </p>

              <h2 className="font-serif text-5xl leading-tight xl:text-7xl">
                Master the road.
                <span className="block text-gold-400">
                  Elevate your drive.
                </span>
              </h2>

              <p className="mt-6 max-w-lg leading-8 text-slate-300">
                Executive-level driving education designed
                around confidence, safety and performance.
              </p>

            </div>

            <p className="text-xs uppercase tracking-[0.25em] text-slate-400">
              DriveWise Executive Academy © 2026
            </p>

          </div>
        </div>


        {/* =================================================
            LOGIN
        ================================================= */}

        <div className="relative flex min-h-screen items-center justify-center px-6 py-12">
          <div className="absolute right-5 top-5 z-20 sm:right-8 sm:top-8">
            <ThemeToggle compact />
          </div>

          <motion.div
            initial={{
              opacity: 0,
              y: 25,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.5,
            }}
            className="w-full max-w-md"
          >

            {/* MOBILE LOGO */}

            <div className="mb-10 lg:hidden">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold-500/40">

                  <span className="font-serif text-xl text-gold-400">
                    DW
                  </span>

                </div>

                <div>

                  <p className="font-semibold tracking-[0.25em]">
                    DRIVEWISE
                  </p>

                  <p className="text-[10px] uppercase tracking-[0.3em] text-gold-400">
                    Executive Academy
                  </p>

                </div>

              </div>

            </div>


            {/* HEADER */}

            <div className="mb-8">

              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl border border-gold-500/30 bg-gold-500/10">

                <LockKeyhole className="h-5 w-5 text-gold-400" />

              </div>

              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.3em] text-gold-400">
                Secure Access
              </p>

              <h2 className="font-serif text-4xl">
                Welcome back.
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Access your DriveWise executive dashboard
                and academy services.
              </p>

            </div>


            {/* ERROR */}

            {error && (
              <div className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}


            {/* FORM */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* EMAIL */}

              <div>

                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Email Address
                </label>

                <div className="relative">

                  <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                  <input
                    type="email"
                    value={email}
                    onChange={(event) =>
                      setEmail(event.target.value)
                    }
                    autoComplete="email"
                    placeholder="admin@drivewise.com"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-4 pl-12 pr-4 text-white outline-none transition focus:border-gold-500/60 focus:bg-white/[0.05]"
                  />

                </div>

              </div>


              {/* PASSWORD */}

              <div>

                <label className="mb-2 block text-xs font-semibold uppercase tracking-wider text-slate-400">
                  Password
                </label>

                <div className="relative">

                  <LockKeyhole className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-500" />

                  <input
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(event) =>
                      setPassword(event.target.value)
                    }
                    autoComplete="current-password"
                    placeholder="Enter password"
                    className="w-full rounded-xl border border-white/10 bg-white/[0.03] py-4 pl-12 pr-12 text-white outline-none transition focus:border-gold-500/60 focus:bg-white/[0.05]"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(
                        (value) => !value
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white"
                  >
                    {showPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>

                </div>

              </div>


              {/* OPTIONS */}

              <div className="flex items-center justify-between text-xs">

                <label className="flex items-center gap-2 text-slate-400">

                  <input
                    type="checkbox"
                    className="accent-yellow-500"
                  />

                  Remember me

                </label>

                <Link to="/forgot-password" className="font-semibold text-gold-400 hover:text-gold-300">Forgot password?</Link>

              </div>


              {/* LOGIN BUTTON */}

              <button
                type="submit"
                disabled={loading}
                className="group flex w-full items-center justify-center gap-3 rounded-xl bg-gold-500 py-4 font-semibold text-executive-950 transition hover:bg-gold-400 disabled:cursor-not-allowed disabled:opacity-60"
              >

                {loading ? (
                  <>
                    <span className="h-5 w-5 animate-spin rounded-full border-2 border-executive-950/30 border-t-executive-950" />

                    Signing in...
                  </>
                ) : (
                  <>
                    Sign In

                    <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                  </>
                )}

              </button>

            </form>


            <p className="mt-6 text-center text-xs text-slate-500">New to DriveWise? <Link to="/signup" className="font-bold text-gold-400">Create an account</Link></p>

            <div className="mt-4 rounded-xl border border-white/10 bg-white/[0.02] p-4">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">Student Demo Account</p>
              <p className="mt-2 text-xs text-slate-500">Email: <span className="text-slate-300">student@drivewise.com</span></p>
              <p className="mt-1 text-xs text-slate-500">Password: <span className="text-slate-300">123456</span></p>
            </div>

            {/* PROTECTED */}

            <div className="my-8 flex items-center gap-4">

              <div className="h-px flex-1 bg-white/10" />

              <span className="text-[9px] uppercase tracking-[0.3em] text-slate-600">
                Protected
              </span>

              <div className="h-px flex-1 bg-white/10" />

            </div>


            {/* DEMO LOGIN */}

            <div className="rounded-xl border border-gold-500/20 bg-gold-500/5 p-4">

              <p className="text-xs font-semibold uppercase tracking-wider text-gold-400">
                Demo Account
              </p>

              <div className="mt-2 text-xs text-slate-400">

                <p>
                  Email:{" "}
                  <span className="text-slate-300">
                    admin@drivewise.com
                  </span>
                </p>

                <p className="mt-1">
                  Password:{" "}
                  <span className="text-slate-300">
                    123456
                  </span>
                </p>

              </div>

            </div>

          </motion.div>

        </div>

      </div>

    </div>
  );
}