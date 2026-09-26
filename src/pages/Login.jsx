import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  GraduationCap,
  Lock,
  Mail,
  Brain,
  Code2,
  Cpu,
  Bot,
  Sparkles,
  ShieldCheck,
  UserRound,
  Users,
  ArrowRight,
  CheckCircle2,
  Terminal,
  Database,
  Network,
  CircuitBoard,
  Zap,
} from "lucide-react";
import { supabase } from "../lib/supabaseClient";

export default function Login() {
  const navigate = useNavigate();

  const [role, setRole] = useState("Student");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

      if (error) {
        throw error;
      }

      const userRole = data.user?.user_metadata?.role;

      if (userRole === "student") {
        navigate("/student");
      } else if (userRole === "faculty") {
        navigate("/faculty");
      } else if (userRole === "admin") {
        navigate("/admin");
      } else {
        setError("User role is not configured.");
        await supabase.auth.signOut();
      }
    } catch (err) {
      setError(
        err.message || "Login failed. Please check your credentials."
      );
    } finally {
      setLoading(false);
    }
  };

  const roleConfig = {
    Student: {
      icon: UserRound,
      label: "Student",
      description: "Access your learning dashboard",
      color: "blue",
    },
    Faculty: {
      icon: Users,
      label: "Faculty",
      description: "Manage academics & students",
      color: "indigo",
    },
    Admin: {
      icon: ShieldCheck,
      label: "Admin",
      description: "Manage the EduAI platform",
      color: "violet",
    },
  };

  const ActiveRoleIcon = roleConfig[role].icon;

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#eef8ff] text-slate-900">

      {/* =========================================================
          FUTURISTIC BACKGROUND
      ========================================================== */}

      <style>{`
        @keyframes floatOne {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          50% {
            transform: translate3d(15px, -25px, 0) rotate(8deg);
          }
        }

        @keyframes floatTwo {
          0%, 100% {
            transform: translate3d(0, 0, 0) rotate(0deg);
          }
          50% {
            transform: translate3d(-20px, 20px, 0) rotate(-8deg);
          }
        }

        @keyframes floatThree {
          0%, 100% {
            transform: translate3d(0, 0, 0);
          }
          50% {
            transform: translate3d(10px, 18px, 0);
          }
        }

        @keyframes pulseSoft {
          0%, 100% {
            opacity: .35;
            transform: scale(1);
          }
          50% {
            opacity: .65;
            transform: scale(1.08);
          }
        }

        @keyframes orbit {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes scanLine {
          0% {
            transform: translateY(-120%);
          }
          100% {
            transform: translateY(120%);
          }
        }

        @keyframes shimmerButton {
          0% {
            transform: translateX(-120%);
          }
          100% {
            transform: translateX(120%);
          }
        }

        @keyframes typingDot {
          0%, 100% {
            opacity: .25;
            transform: translateY(0);
          }
          50% {
            opacity: 1;
            transform: translateY(-3px);
          }
        }

        @keyframes borderGlow {
          0%, 100% {
            opacity: .35;
          }
          50% {
            opacity: .8;
          }
        }

        .login-float-one {
          animation: floatOne 8s ease-in-out infinite;
        }

        .login-float-two {
          animation: floatTwo 10s ease-in-out infinite;
        }

        .login-float-three {
          animation: floatThree 7s ease-in-out infinite;
        }

        .login-pulse {
          animation: pulseSoft 6s ease-in-out infinite;
        }

        .login-orbit {
          animation: orbit 28s linear infinite;
        }

        .login-scan {
          animation: scanLine 7s linear infinite;
        }

        .login-border-glow {
          animation: borderGlow 4s ease-in-out infinite;
        }

        .login-button-shimmer {
          animation: shimmerButton 2.8s ease-in-out infinite;
        }

        .typing-dot-1 {
          animation: typingDot 1.4s ease-in-out infinite;
        }

        .typing-dot-2 {
          animation: typingDot 1.4s ease-in-out .2s infinite;
        }

        .typing-dot-3 {
          animation: typingDot 1.4s ease-in-out .4s infinite;
        }

        .tech-grid {
          background-image:
            linear-gradient(
              rgba(37, 99, 235, .045) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(37, 99, 235, .045) 1px,
              transparent 1px
            );
          background-size: 46px 46px;
        }

        .glass-login {
          background: rgba(255, 255, 255, .58);
          border: 1px solid rgba(255, 255, 255, .88);
          box-shadow:
            0 40px 100px rgba(30, 64, 175, .13),
            0 15px 40px rgba(14, 165, 233, .08),
            inset 0 1px 0 rgba(255, 255, 255, .95);
          backdrop-filter: blur(28px);
          -webkit-backdrop-filter: blur(28px);
        }

        .glass-field {
          background: rgba(255, 255, 255, .62);
          border: 1px solid rgba(148, 163, 184, .22);
          box-shadow:
            inset 0 1px 0 rgba(255,255,255,.7);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
        }

        .glass-field:focus-within {
          border-color: rgba(59, 130, 246, .55);
          box-shadow:
            0 0 0 4px rgba(59, 130, 246, .09),
            0 10px 30px rgba(37, 99, 235, .07),
            inset 0 1px 0 rgba(255,255,255,.8);
        }

        .role-active {
          box-shadow:
            0 10px 25px rgba(37, 99, 235, .13),
            inset 0 1px 0 rgba(255,255,255,.95);
        }

        @media (prefers-reduced-motion: reduce) {
          .login-float-one,
          .login-float-two,
          .login-float-three,
          .login-pulse,
          .login-orbit,
          .login-scan,
          .login-border-glow,
          .login-button-shimmer,
          .typing-dot-1,
          .typing-dot-2,
          .typing-dot-3 {
            animation: none !important;
          }
        }
      `}</style>

      {/* =========================================================
          GRID
      ========================================================== */}

      <div className="tech-grid pointer-events-none absolute inset-0" />

      {/* =========================================================
          BACKGROUND GLOWS
      ========================================================== */}

      <div className="login-pulse pointer-events-none absolute -left-32 top-[-120px] h-[500px] w-[500px] rounded-full bg-cyan-800/25 blur-[110px]" />

      <div className="login-pulse pointer-events-none absolute -right-32 top-[5%] h-[520px] w-[520px] rounded-full bg-blue-400/40 blur-[120px]" />

      <div className="login-pulse pointer-events-none absolute bottom-[-180px] left-[35%] h-[500px] w-[500px] rounded-full bg-indigo-500/20 blur-[130px]" />

      {/* =========================================================
          DECORATIVE TECH ELEMENTS
      ========================================================== */}

      {/* Code card */}
      <div className="login-float-one pointer-events-none absolute left-[5%] top-[15%] hidden w-48 rounded-2xl border border-white/80 bg-white/45 p-4 shadow-2xl shadow-blue-900/5 backdrop-blur-xl xl:block">

        <div className="mb-3 flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600">
            <Code2 size={15} />
          </div>

          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
            AI Code
          </span>
        </div>

        <div className="space-y-2 font-mono text-[9px]">
          <div className="flex gap-2">
            <span className="text-blue-500">01</span>
            <span className="text-indigo-500">const</span>
            <span className="text-slate-500">learn</span>
          </div>

          <div className="flex gap-2">
            <span className="text-blue-500">02</span>
            <span className="text-cyan-500">AI</span>
            <span className="text-slate-400">.recommend()</span>
          </div>

          <div className="flex gap-2">
            <span className="text-blue-500">03</span>
            <span className="text-emerald-500">success</span>
            <span className="text-slate-400">= true</span>
          </div>
        </div>

      </div>


      {/* AI floating card */}
      <div className="login-float-two pointer-events-none absolute right-[5%] top-[19%] hidden w-48 rounded-2xl border border-white/80 bg-white/45 p-4 shadow-2xl shadow-indigo-900/5 backdrop-blur-xl xl:block">

        <div className="flex items-center gap-3">

          <div className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20">
            <Brain size={20} />
          </div>

          <div>
            <p className="text-xs font-extrabold text-slate-800">
              AI Engine
            </p>

            <div className="mt-1 flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="text-[9px] font-semibold text-emerald-800">
                Online
              </span>
            </div>
          </div>

        </div>

        <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-slate-100">
          <div className="h-full w-[78%] rounded-full bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-500" />
        </div>

        <p className="mt-2 text-[9px] font-medium text-slate-400">
          Personalization engine active
        </p>

      </div>


      {/* Robotics card */}
      <div className="login-float-three pointer-events-none absolute bottom-[16%] left-[7%] hidden rounded-2xl border border-white/80 bg-white/45 p-4 shadow-2xl shadow-cyan-900/5 backdrop-blur-xl xl:block">

        <div className="flex items-center gap-3">

          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-cyan-500/10 text-cyan-600">
            <Bot size={21} />
          </div>

          <div>
            <p className="text-xs font-extrabold text-slate-800">
              Robotics Hub
            </p>

            <p className="mt-1 text-[9px] text-slate-400">
              Future technology
            </p>
          </div>

        </div>

      </div>


      {/* =========================================================
          ORBIT
      ========================================================== */}

      <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[650px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-200/25 lg:block">

        <div className="login-orbit absolute inset-0">

          <div className="absolute -top-3 left-1/2 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full bg-white shadow-lg shadow-blue-500/20">
            <Cpu size={12} className="text-blue-500" />
          </div>

        </div>

      </div>


      {/* =========================================================
          MAIN AREA
      ========================================================== */}

      <div className="relative z-20 flex min-h-screen w-full items-center justify-center px-4 py-8 sm:px-6 lg:py-12">

        <div className="w-full max-w-[460px]">

          {/* =====================================================
              BRAND
          ====================================================== */}

          <div className="mb-6 text-center">

            <div className="relative mx-auto mb-4 flex h-[42px] w-[62px] items-center justify-center">

              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-blue-500/20 via-cyan-400/20 to-indigo-500/20 blur-xl" />

              <div className="relative flex h-[62px] w-[62px] items-center justify-center rounded-2xl border border-white/80 bg-gradient-to-br from-blue-600 via-cyan-500 to-indigo-600 text-white shadow-xl shadow-blue-500/25">

                <GraduationCap size={30} strokeWidth={2.1} />

              </div>

            </div>

            <h1 className="text-3xl font-black tracking-tight text-slate-950 sm:text-4xl">
              Welcome to{" "}
              <span className="bg-gradient-to-r from-blue-600 via-cyan-500 to-indigo-600 bg-clip-text text-transparent">
                EduAI
              </span>
            </h1>

            <p className="mx-auto mt-2 max-w-5xl text-sm font-medium text-slate-500">
              Your intelligent learning space for academics,
              progress and future-ready skills.
            </p>

          </div>


          {/* =====================================================
              LOGIN CARD
          ====================================================== */}

          <div className="relative">

            {/* Glow behind card */}

            <div className="login-border-glow pointer-events-none absolute -inset-1 rounded-[2rem] bg-gradient-to-r from-cyan-400/20 via-blue-500/25 to-indigo-500/20 blur-x5" />

            <div className="glass-login relative rounded-[1rem] p-7 sm:p-7">

              {/* Top status */}

              <div className="mb-5 flex items-center justify-between">

                <div>
                  <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-blue-300">
                    Secure Access
                  </p>

                  <h2 className="mt-1 text-xl font-black text-slate-900">
                    Sign in to continue
                  </h2>
                </div>

                <div className="flex items-center gap-1.5 rounded-full border border-emerald-200/70 bg-emerald-50/70 px-3 py-1.5">

                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative h-2 w-2 rounded-full bg-emerald-500" />
                  </span>

                  <span className="text-[8px] font-bold text-emerald-700">
                    Secure
                  </span>

                </div>

              </div>


              {/* =================================================
                  ROLE SELECTOR
              ================================================== */}

              <div className="mb-6">

                <p className="mb-2.5 text-xs font-bold text-slate-500">
                  Choose your access
                </p>

                <div className="grid grid-cols-3 gap-2 rounded-2xl border border-white/80 bg-slate-100/65 p-1.5">

                  {Object.entries(roleConfig).map(
                    ([key, config]) => {

                      const Icon = config.icon;
                      const active = role === key;

                      return (
                        <button
                          key={key}
                          type="button"
                          onClick={() => {
                            setRole(key);
                            setError("");
                          }}
                          className={`group relative flex flex-col items-center justify-center rounded-xl px-2 py-3 transition-all duration-300 ${
                            active
                              ? "role-active bg-white text-blue-600"
                              : "text-slate-400 hover:bg-white/55 hover:text-slate-700"
                          }`}
                        >

                          {active && (
                            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500/5 to-cyan-500/5" />
                          )}

                          <Icon
                            size={19}
                            className={`relative transition-transform duration-300 ${
                              active
                                ? "scale-110"
                                : "group-hover:scale-110"
                            }`}
                          />

                          <span className="relative mt-1.5 text-[11px] font-bold">
                            {config.label}
                          </span>

                        </button>
                      );
                    }
                  )}

                </div>

                <div className="mt-2 flex items-center gap-2 text-[10px] font-medium text-slate-400">

                  <ActiveRoleIcon size={12} className="text-blue-500" />

                  <span>
                    {roleConfig[role].description}
                  </span>

                </div>

              </div>


              {/* =================================================
                  FORM
              ================================================== */}

              <form onSubmit={handleLogin} className="space-y-4">

                {/* Email */}

                <div>

                  <label className="mb-2 block text-xs font-bold text-slate-600">
                    Email Address
                  </label>

                  <div className="glass-field group relative flex items-center rounded-xl transition-all duration-300">

                    <Mail
                      size={17}
                      className="ml-3.5 shrink-0 text-slate-400 transition-colors group-focus-within:text-blue-500"
                    />

                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      required
                      className="w-full bg-transparent px-3 py-3.5 text-sm font-medium text-slate-800 outline-none placeholder:text-slate-400"
                    />

                  </div>

                </div>


                {/* Password */}

                <div>

                  <div className="mb-2 flex items-center justify-between">

                    <label className="text-xs font-bold text-slate-600">
                      Password
                    </label>

                    <span className="text-[10px] font-semibold text-slate-400">
                      Keep it secure
                    </span>

                  </div>

                  <div className="glass-field group relative flex items-center rounded-xl transition-all duration-300">

                    <Lock
                      size={17}
                      className="ml-3.5 shrink-0 text-slate-400 transition-colors group-focus-within:text-blue-500"
                    />

                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Register Number / Password"
                      required
                      className="w-full bg-transparent px-1 py-3.5 text-sm font-medium text-slate-900 outline-none placeholder:text-slate-300"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="mr-3 rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                      aria-label={
                        showPassword
                          ? "Hide password"
                          : "Show password"
                      }
                    >
                      {showPassword ? (
                        <EyeOff size={17} />
                      ) : (
                        <Eye size={17} />
                      )}
                    </button>

                  </div>

                </div>


                {/* Error */}

                {error && (
                  <div className="flex items-start gap-3 rounded-xl border border-red-200/70 bg-red-50/80 px-4 py-3 text-sm text-red-600 shadow-sm">

                    <div className="mt-0.5 h-2 w-2 shrink-0 rounded-full bg-red-500" />

                    <p className="leading-5">
                      {error}
                    </p>

                  </div>
                )}


                {/* =================================================
                    LOGIN BUTTON
                ================================================== */}

                <button
                  type="submit"
                  disabled={loading}
                  className="group relative mt-2 flex w-full items-center justify-center gap-3 overflow-hidden rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-[length:200%_100%] py-3.5 text-sm font-extrabold text-white shadow-xl shadow-blue-600/20 transition-all duration-500 hover:-translate-y-0.5 hover:bg-[position:100%_0%] hover:shadow-2xl hover:shadow-blue-600/25 disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {!loading && (
                    <span className="login-button-shimmer absolute inset-y-0 w-24 skew-x-[-20deg] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  )}

                  {loading ? (
                    <>
                      <span className="relative h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />

                      <span className="relative">
                        Signing in...
                      </span>
                    </>
                  ) : (
                    <>
                      <span className="relative">
                        Login as {role}
                      </span>

                      <ArrowRight
                        size={17}
                        className="relative transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </>
                  )}

                </button>

              </form>


              {/* =================================================
                  DEMO INFORMATION
              ================================================== */}

              <div className="mt-5">

                {role === "Student" && (
                  <div className="relative overflow-hidden rounded-xl border border-blue-100/80 bg-blue-50/60 p-4">

                    <div className="absolute right-[-20px] top-[-20px] h-20 w-20 rounded-full bg-blue-300/15 blur-2xl" />

                    <div className="relative flex items-start gap-4">

                      <div className="flex h-11 w-14 shrink-0 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
                        <GraduationCap size={16} />
                      </div>

                      <div>

                        <p className="text-xs font-extrabold text-blue-700">
                          Student Demo Login
                        </p>

                        <p className="mt-1 text-[10px] leading-5 text-blue-600/75">
                          Email: registered college email
                          <br />
                          Password: Registration Number
                        </p>

                      </div>

                    </div>

                  </div>
                )}


                {role === "Faculty" && (
                  <div className="relative overflow-hidden rounded-xl border border-indigo-100/80 bg-indigo-50/60 p-4">

                    <div className="absolute right-[-20px] top-[-20px] h-20 w-20 rounded-full bg-indigo-300/15 blur-2xl" />

                    <div className="relative flex items-start gap-4">

                      <div className="flex h-11 w-14 shrink-0 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600">
                        <Users size={16} />
                      </div>

                      <div>

                        <p className="text-xs font-extrabold text-indigo-700">
                          Faculty Demo Login
                        </p>

                        <p className="mt-1 text-[10px] leading-5 text-indigo-600/75">
                          Email: faculty@eduai.demo
                          <br />
                          Password: EduAI@12345
                        </p>

                      </div>

                    </div>

                  </div>
                )}


                {role === "Admin" && (
                  <div className="relative overflow-hidden rounded-xl border border-slate-200 bg-slate-50/70 p-4">

                    <div className="relative flex items-start gap-4">

                      <div className="flex h-11 w-14 shrink-0 items-center justify-center rounded-lg bg-slate-200 text-slate-600">
                        <ShieldCheck size={16} />
                      </div>

                      <div>

                        <p className="text-xs font-extrabold text-slate-700">
                          Admin Access
                        </p>

                        <p className="mt-1 text-[10px] leading-5 text-slate-500">
                          Admin authentication will be connected next.
                        </p>

                      </div>

                    </div>

                  </div>
                )}

              </div>


              {/* =================================================
                  SECURITY FOOTER
              ================================================== */}

              <div className="mt-5 flex items-center justify-center gap-5 text-[9px] font-bold uppercase tracking-wider text-slate-400">

                <span className="flex items-center gap-1.5">
                  <ShieldCheck size={11} className="text-emerald-500" />
                  Secure
                </span>

                <span className="h-3 w-px bg-slate-200" />

                <span className="flex items-center gap-1.5">
                  <Zap size={11} className="text-cyan-500" />
                  Fast
                </span>

                <span className="h-3 w-px bg-slate-200" />

                <span className="flex items-center gap-1.5">
                  <Brain size={11} className="text-blue-500" />
                  AI Powered
                </span>

              </div>

            </div>

          </div>


          {/* =====================================================
              BOTTOM TECHNOLOGY INDICATOR
          ====================================================== */}

          <div className="mt-6 flex items-center justify-center gap-3 text-[10px] font-semibold text-slate-400">

            <div className="flex items-center gap-1.5">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-white/60 shadow-sm">
                <Code2 size={11} />
              </span>
              Coding
            </div>

            <span className="h-3 w-px bg-slate-300" />

            <div className="flex items-center gap-9">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-white/60 shadow-sm">
                <Bot size={11} />
              </span>
              Robotics
            </div>

            <span className="h-3 w-px bg-slate-300" />

            <div className="flex items-center gap-6">
              <span className="flex h-5 w-5 items-center justify-center rounded-md bg-white/60 shadow-sm">
                <Brain size={11} />
              </span>
              AI
            </div>

          </div>


          {/* Footer */}

          <p className="mt-8 text-center text-[15px] font-medium text-slate-800">
            © 2026 EduAI • Intelligent Personalized Learning Platform
          </p>

        </div>

      </div>


      {/* =========================================================
          SMALL TECH ICONS
      ========================================================== */}

      <div className="pointer-events-none absolute bottom-[8%] right-[7%] hidden lg:block">

        <div className="login-float-one flex items-center gap-2 rounded-xl border border-white/80 bg-white/40 px-3 py-2 shadow-xl backdrop-blur-x1">

          <div className="flex h-7 w-7 items-center justify-center rounded-1g bg-violet-500/10 text-violet-500">
            <CircuitBoard size={14} />
          </div>

          <div>
            <p className="text-[9px] font-bold text-slate-700">
              Future Hub
            </p>

            <div className="mt-0.5 flex gap-0.5">
              <span className="typing-dot-1 h-1 w-1 rounded-full bg-violet-400" />
              <span className="typing-dot-2 h-1 w-1 rounded-full bg-violet-400" />
              <span className="typing-dot-3 h-1 w-1 rounded-full bg-violet-400" />
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}