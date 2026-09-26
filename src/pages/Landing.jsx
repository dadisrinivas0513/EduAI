import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Brain,
  CheckCircle,
  Clock4,
  Sparkles,
  BookOpen,
  Target,
  Users,
  TrendingUp,
  ChevronDown,
  Zap,
} from "lucide-react";

function Landing() {
  const [dashboardVisible, setDashboardVisible] = useState(false);
  const dashboardRef = useRef(null);

  useEffect(() => {
    const element = dashboardRef.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDashboardVisible(true);
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: CheckCircle,
      title: "Tests & Assignments",
      text: "Organize tests, assignments and academic activities in one place.",
      iconStyle:
        "bg-blue-500/10 text-blue-600 border border-blue-200/60",
    },
    {
      icon: Brain,
      title: "AI Recommendations",
      text: "Receive personalized learning suggestions based on your progress.",
      iconStyle:
        "bg-indigo-500/10 text-indigo-600 border border-indigo-200/60",
    },
    {
      icon: Clock4,
      title: "Smart Time Utilization",
      text: "Turn free time into productive preparation for aptitude, coding and interviews.",
      iconStyle:
        "bg-cyan-500/10 text-cyan-600 border border-cyan-200/60",
    },
    {
      icon: TrendingUp,
      title: "Academic Progress",
      text: "Understand your performance and identify areas that need attention.",
      iconStyle:
        "bg-emerald-500/10 text-emerald-600 border border-emerald-200/60",
    },
    {
      icon: Users,
      title: "Role-based Platform",
      text: "Dedicated experiences for students, faculty and administrators.",
      iconStyle:
        "bg-violet-500/10 text-violet-600 border border-violet-200/60",
    },
    {
      icon: Target,
      title: "Focused Learning",
      text: "Build a smarter learning routine around your academic goals.",
      iconStyle:
        "bg-orange-500/10 text-orange-600 border border-orange-200/60",
    },
  ];

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#f5fbff] text-slate-900">

      <style>{`
        html,
        body,
        #root {
          width: 100%;
          min-width: 0;
          margin: 0;
          padding: 0;
        }

        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }

        body {
          overflow-x: hidden;
        }

        .page-container {
          width: min(1440px, calc(100% - 48px));
          margin-inline: auto;
          min-width: 0;
        }

        @media (max-width: 767px) {
          .page-container {
            width: calc(100% - 32px);
          }
        }

        @media (max-width: 480px) {
          .page-container {
            width: calc(100% - 24px);
          }
        }

        @keyframes floatSlow {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(0, -18px, 0);
          }
        }

        @keyframes floatReverse {
          0%,
          100% {
            transform: translate3d(0, 0, 0);
          }

          50% {
            transform: translate3d(12px, 14px, 0);
          }
        }

        @keyframes pulseGlow {
          0%,
          100% {
            opacity: 0.35;
            transform: scale(1);
          }

          50% {
            opacity: 0.6;
            transform: scale(1.08);
          }
        }

        @keyframes shimmer {
          0% {
            background-position: -200% center;
          }

          100% {
            background-position: 200% center;
          }
        }

        @keyframes revealUp {
          from {
            opacity: 0;
            transform: translateY(45px) scale(0.98);
          }

          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(24px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-float-slow {
          animation: floatSlow 6s ease-in-out infinite;
        }

        .animate-float-reverse {
          animation: floatReverse 7s ease-in-out infinite;
        }

        .animate-pulse-glow {
          animation: pulseGlow 5s ease-in-out infinite;
        }

        .animate-reveal-up {
          animation: revealUp 0.9s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .animate-fade-up {
          animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
        }

        .glass {
          background: rgba(255, 255, 255, 0.55);
          border: 1px solid rgba(255, 255, 255, 0.8);
          box-shadow:
            0 25px 70px rgba(30, 64, 175, 0.08),
            inset 0 1px 0 rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(24px);
          -webkit-backdrop-filter: blur(24px);
        }

        .glass-strong {
          background: rgba(255, 255, 255, 0.72);
          border: 1px solid rgba(255, 255, 255, 0.9);
          box-shadow:
            0 30px 90px rgba(30, 64, 175, 0.12),
            inset 0 1px 0 rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(30px);
          -webkit-backdrop-filter: blur(30px);
        }

        .gradient-text {
          background: linear-gradient(
            90deg,
            #2563eb,
            #06b6d4,
            #4f46e5
          );
          background-size: 200% auto;
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
          animation: shimmer 7s linear infinite;
        }

        .grid-pattern {
          background-image:
            linear-gradient(
              rgba(37, 99, 235, 0.035) 1px,
              transparent 1px
            ),
            linear-gradient(
              90deg,
              rgba(37, 99, 235, 0.035) 1px,
              transparent 1px
            );
          background-size: 42px 42px;
        }

        img,
        svg,
        video,
        canvas {
          max-width: 100%;
        }

        @media (prefers-reduced-motion: reduce) {
          *,
          *::before,
          *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
          }
        }
      `}</style>

      {/* ========================= NAVBAR ========================= */}

      <header className="sticky top-0 z-50 border-b border-white/70 bg-white/75 backdrop-blur-2xl">
        <nav className="page-container flex h-[70px] items-center justify-between gap-4">

          <Link
            to="/"
            className="group flex min-w-0 items-center gap-3"
          >
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-blue-600 via-cyan-500 to-indigo-600 text-white shadow-lg shadow-blue-500/20 transition duration-300 group-hover:scale-105">
              <div className="absolute inset-0 bg-white/20 opacity-0 transition group-hover:opacity-100" />

              <Brain
                size={21}
                strokeWidth={2.3}
                className="relative"
              />
            </div>

            <div className="leading-none">
              <h1 className="text-xl font-extrabold tracking-tight text-slate-900">
                Edu<span className="text-blue-600">AI</span>
              </h1>

              <p className="mt-1 hidden text-[8px] font-bold uppercase tracking-[0.2em] text-slate-400 sm:block">
                Intelligent Learning
              </p>
            </div>
          </Link>

          <Link
            to="/login"
            className="group inline-flex shrink-0 items-center gap-2 rounded-xl border border-blue-200/70 bg-white/70 px-4 py-2.5 text-sm font-bold text-blue-700 shadow-sm backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-300 hover:bg-white hover:shadow-lg sm:px-5"
          >
            Login

            <ArrowRight
              size={15}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>

        </nav>
      </header>

      <main>

        {/* ========================= HERO ========================= */}

        <section className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-indigo-100">

          <div className="grid-pattern pointer-events-none absolute inset-0 opacity-70" />

          <div className="pointer-events-none absolute -left-32 top-10 h-[420px] w-[420px] rounded-full bg-cyan-300/25 blur-[100px] animate-pulse-glow" />

          <div className="pointer-events-none absolute right-[-160px] top-[-80px] h-[520px] w-[520px] rounded-full bg-blue-400/20 blur-[120px] animate-pulse-glow" />

          <div className="pointer-events-none absolute bottom-[-180px] left-[35%] h-[500px] w-[500px] rounded-full bg-indigo-300/20 blur-[120px]" />

          <div className="pointer-events-none absolute left-[8%] top-[20%] hidden h-16 w-16 rotate-12 rounded-2xl border border-white/70 bg-white/25 shadow-xl backdrop-blur-xl lg:block animate-float-slow" />

          <div className="pointer-events-none absolute right-[9%] top-[28%] hidden h-20 w-20 -rotate-12 rounded-full border border-white/70 bg-white/25 shadow-xl backdrop-blur-xl lg:block animate-float-reverse" />

          <div className="page-container relative flex min-h-[calc(100vh-70px)] items-center py-16 sm:py-20 lg:py-24">

            <div className="mx-auto w-full max-w-4xl text-center">

              <div className="animate-fade-up inline-flex max-w-full items-center gap-2 rounded-full border border-blue-200/70 bg-white/65 px-4 py-2 text-xs font-bold text-blue-700 shadow-lg shadow-blue-900/5 backdrop-blur-xl sm:text-sm">

                <span className="relative flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-500" />
                </span>

                <span>Intelligent Learning Platform</span>

              </div>

              <h2
                className="animate-fade-up mx-auto mt-7 max-w-4xl text-5xl font-black leading-[0.98] tracking-[-0.045em] text-slate-950 sm:text-6xl lg:text-8xl"
                style={{ animationDelay: "100ms" }}
              >
                Learn Smarter.
                <br />

                <span className="gradient-text">
                  Perform Better.
                </span>
              </h2>

              <p
                className="animate-fade-up mx-auto mt-7 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg sm:leading-8"
                style={{ animationDelay: "200ms" }}
              >
                One intelligent platform to manage academics,
                understand progress, receive personalized recommendations
                and make every learning moment more productive.
              </p>

              <div
                className="animate-fade-up mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
                style={{ animationDelay: "300ms" }}
              >

                <Link
                  to="/login"
                  className="group relative inline-flex w-full items-center justify-center gap-3 overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-[length:200%_100%] px-8 py-4 text-sm font-extrabold text-white shadow-xl shadow-blue-600/25 transition-all duration-500 hover:-translate-y-1 hover:bg-[position:100%_0%] hover:shadow-2xl sm:w-auto"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

                  <span className="relative">
                    Get Started
                  </span>

                  <ArrowRight
                    size={18}
                    className="relative transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>

                <a
                  href="#features"
                  className="group inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/80 bg-white/55 px-8 py-4 text-sm font-bold text-slate-700 shadow-lg backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:bg-white/80 hover:text-blue-700 hover:shadow-xl sm:w-auto"
                >
                  Explore Platform

                  <ChevronDown
                    size={17}
                    className="transition-transform duration-300 group-hover:translate-y-1"
                  />
                </a>

              </div>

              <div
                className="animate-fade-up mx-auto mt-10 flex max-w-2xl flex-wrap items-center justify-center gap-x-7 gap-y-3 text-sm font-semibold text-slate-500"
                style={{ animationDelay: "400ms" }}
              >

                <span className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-emerald-500" />
                  Academic Management
                </span>

                <span className="hidden h-4 w-px bg-slate-300 sm:block" />

                <span className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-emerald-500" />
                  AI Recommendations
                </span>

                <span className="hidden h-4 w-px bg-slate-300 sm:block" />

                <span className="flex items-center gap-2">
                  <CheckCircle size={16} className="text-emerald-500" />
                  Smart Learning
                </span>

              </div>

              <div
                className="animate-fade-up mt-16 flex flex-col items-center gap-2 text-xs font-semibold text-slate-400"
                style={{ animationDelay: "500ms" }}
              >
                <span>Scroll to explore</span>

                <div className="flex h-8 w-5 items-start justify-center rounded-full border border-slate-300/80 p-1">
                  <span className="h-1.5 w-1 rounded-full bg-blue-500 animate-bounce" />
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* ========================= DASHBOARD ========================= */}

        <section
          ref={dashboardRef}
          className="relative overflow-hidden bg-gradient-to-b from-white via-sky-50 to-blue-100/60 py-20 sm:py-28 lg:py-32"
        >

          <div className="pointer-events-none absolute left-[-150px] top-20 h-[400px] w-[400px] rounded-full bg-cyan-300/20 blur-[120px]" />

          <div className="pointer-events-none absolute right-[-150px] bottom-10 h-[450px] w-[450px] rounded-full bg-indigo-300/20 blur-[120px]" />

          <div className="page-container relative">

            <div className="mx-auto max-w-2xl text-center">

              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-blue-600">
                Your Learning Command Center
              </p>

              <h2 className="mt-3 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
                Everything you need.
                <span className="gradient-text">
                  {" "}In one view.
                </span>
              </h2>

              <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
                Track your academic activities, understand your performance
                and discover what to focus on next.
              </p>

            </div>

            <div
              className={`relative mx-auto mt-12 w-full max-w-5xl transition-all duration-1000 sm:mt-14 ${
                dashboardVisible
                  ? "translate-y-0 opacity-100"
                  : "translate-y-16 opacity-0"
              }`}
            >

              <div className="pointer-events-none absolute -inset-8 rounded-[3rem] bg-gradient-to-r from-cyan-400/15 via-blue-500/20 to-indigo-500/15 blur-3xl" />

              <div className="glass-strong relative w-full overflow-hidden rounded-[2rem] p-2 shadow-2xl shadow-blue-900/15 sm:p-3">

                <div className="flex h-12 items-center justify-between border-b border-slate-200/70 px-3 sm:px-5">

                  <div className="flex items-center gap-1.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-amber-400" />
                    <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
                  </div>

                  <div className="rounded-lg border border-slate-200/70 bg-white/60 px-4 py-1.5 text-[10px] font-bold text-slate-400 sm:px-5">
                    eduai.app
                  </div>

                  <div className="w-8 sm:w-10" />

                </div>

                <div className="m-2 rounded-[1.5rem] border border-white/80 bg-white/75 p-4 shadow-inner backdrop-blur-xl sm:m-3 sm:p-6">

                  <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

                    <div className="min-w-0">
                      <p className="text-xs font-semibold text-slate-400">
                        Good Morning 👋
                      </p>

                      <h3 className="mt-1 text-xl font-black text-slate-950 sm:text-2xl">
                        Student Dashboard
                      </h3>
                    </div>

                    <div className="flex w-fit shrink-0 items-center gap-2 rounded-full border border-blue-100 bg-blue-50/80 px-4 py-2 text-xs font-bold text-blue-600">
                      <Sparkles size={14} />
                      850 Credits
                    </div>

                  </div>

                  <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

                    <div className="min-w-0 rounded-2xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg">

                      <div className="flex items-center justify-between gap-3">
                        <p className="text-xs font-bold text-slate-500">
                          Assignments
                        </p>

                        <CheckCircle
                          size={18}
                          className="shrink-0 text-blue-500"
                        />
                      </div>

                      <p className="mt-3 text-3xl font-black text-blue-600">
                        04
                      </p>

                      <p className="mt-1 text-xs font-medium text-slate-400">
                        Pending
                      </p>

                    </div>

                    <div className="min-w-0 rounded-2xl border border-emerald-100 bg-gradient-to-br from-emerald-50 to-white p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg">

                      <div className="flex items-center justify-between gap-3">
                        <p className="text-xs font-bold text-slate-500">
                          Average Score
                        </p>

                        <TrendingUp
                          size={18}
                          className="shrink-0 text-emerald-500"
                        />
                      </div>

                      <p className="mt-3 text-3xl font-black text-emerald-600">
                        86%
                      </p>

                      <p className="mt-1 text-xs font-medium text-slate-400">
                        This semester
                      </p>

                    </div>

                    <div className="min-w-0 rounded-2xl border border-indigo-100 bg-gradient-to-br from-indigo-50 to-white p-5 transition duration-300 hover:-translate-y-1 hover:shadow-lg sm:col-span-2 lg:col-span-1">

                      <div className="flex items-center justify-between gap-3">
                        <p className="text-xs font-bold text-slate-500">
                          Subjects
                        </p>

                        <BookOpen
                          size={18}
                          className="shrink-0 text-indigo-500"
                        />
                      </div>

                      <p className="mt-3 text-3xl font-black text-indigo-600">
                        06
                      </p>

                      <p className="mt-1 text-xs font-medium text-slate-400">
                        This semester
                      </p>

                    </div>

                  </div>

                  <div className="mt-4 grid gap-4 lg:grid-cols-[1.35fr_0.65fr]">

                    <div className="min-w-0 rounded-2xl border border-slate-200/70 bg-white/75 p-5">

                      <div className="flex items-center justify-between gap-4">

                        <div className="min-w-0">
                          <p className="text-xs font-bold uppercase tracking-wider text-slate-400">
                            Upcoming
                          </p>

                          <h4 className="mt-1 text-base font-black text-slate-900">
                            Academic Activities
                          </h4>
                        </div>

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                          <Clock4 size={19} />
                        </div>

                      </div>

                      <div className="mt-5 space-y-3">

                        <div className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-3">

                          <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-orange-400" />

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-bold text-slate-800">
                              Distributed Systems
                            </p>

                            <p className="text-xs text-slate-400">
                              Tomorrow
                            </p>
                          </div>

                          <span className="shrink-0 rounded-full bg-orange-50 px-2.5 py-1 text-[10px] font-bold text-orange-600 sm:px-3">
                            Test
                          </span>

                        </div>

                        <div className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/80 p-3">

                          <div className="h-2.5 w-2.5 shrink-0 rounded-full bg-blue-400" />

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-bold text-slate-800">
                              Machine Learning Assignment
                            </p>

                            <p className="text-xs text-slate-400">
                              Friday
                            </p>
                          </div>

                          <span className="shrink-0 rounded-full bg-blue-50 px-2.5 py-1 text-[10px] font-bold text-blue-600 sm:px-3">
                            Task
                          </span>

                        </div>

                      </div>

                    </div>

                    <div className="relative min-w-0 overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 via-indigo-600 to-cyan-600 p-5 text-white shadow-xl shadow-blue-500/20">

                      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />

                      <div className="relative">

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/15 backdrop-blur-md">
                          <Sparkles size={20} />
                        </div>

                        <p className="mt-5 text-xs font-semibold text-blue-100">
                          AI Recommendation
                        </p>

                        <h4 className="mt-2 text-lg font-black leading-6">
                          Practice 10 aptitude questions today.
                        </h4>

                        <p className="mt-3 text-xs leading-5 text-blue-100">
                          Build consistency using your available free time.
                        </p>

                        <div className="mt-5 h-1.5 overflow-hidden rounded-full bg-white/15">
                          <div className="h-full w-[72%] rounded-full bg-white" />
                        </div>

                        <p className="mt-2 text-[10px] font-semibold text-blue-100">
                          72% recommendation confidence
                        </p>

                      </div>

                    </div>

                  </div>

                </div>

              </div>
            </div>

          </div>
        </section>

        {/* ========================= FEATURES ========================= */}

        <section
          id="features"
          className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-white to-indigo-50 py-20 sm:py-28"
        >

          <div className="grid-pattern pointer-events-none absolute inset-0 opacity-40" />

          <div className="pointer-events-none absolute left-[-150px] top-20 h-[420px] w-[420px] rounded-full bg-cyan-300/15 blur-[120px]" />

          <div className="pointer-events-none absolute right-[-150px] bottom-0 h-[420px] w-[420px] rounded-full bg-indigo-300/15 blur-[120px]" />

          <div className="page-container relative">

            <div className="mx-auto max-w-2xl text-center">

              <p className="text-xs font-extrabold uppercase tracking-[0.22em] text-blue-600">
                Platform Features
              </p>

              <h2 className="mt-4 text-3xl font-black tracking-tight text-slate-950 sm:text-5xl">
                One Education.
                <br className="sm:hidden" />

                <span className="gradient-text">
                  {" "}One Platform.
                </span>
              </h2>

              <p className="mt-5 text-sm leading-7 text-slate-600 sm:text-base">
                Everything students and faculty need to manage academics,
                monitor progress and make learning more productive.
              </p>

            </div>

            <div className="mx-auto mt-12 grid w-full max-w-[1320px] grid-cols-1 gap-6 md:grid-cols-2 lg:mt-14 lg:grid-cols-3">

              {features.map((feature) => {
                const Icon = feature.icon;

                return (
                  <div
                    key={feature.title}
                    className="glass group relative min-h-[220px] min-w-0 overflow-hidden rounded-3xl p-6 transition-all duration-500 hover:-translate-y-2 hover:bg-white/75 hover:shadow-2xl hover:shadow-blue-900/10"
                  >

                    <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-400/10 blur-3xl transition duration-500 group-hover:bg-blue-400/20" />

                    <div
                      className={`relative flex h-12 w-12 items-center justify-center rounded-2xl ${feature.iconStyle}`}
                    >
                      <Icon size={22} />
                    </div>

                    <h3 className="relative mt-6 text-lg font-black text-slate-900">
                      {feature.title}
                    </h3>

                    <p className="relative mt-3 text-sm leading-6 text-slate-500">
                      {feature.text}
                    </p>

                    <div className="absolute bottom-0 left-0 h-[2px] w-0 bg-gradient-to-r from-blue-500 via-cyan-500 to-indigo-500 transition-all duration-500 group-hover:w-full" />

                  </div>
                );
              })}

            </div>

          </div>
        </section>

        {/* ========================= VALUE STRIP ========================= */}

        <section className="relative overflow-hidden bg-gradient-to-r from-blue-700 via-indigo-700 to-cyan-600 py-20">

          <div className="pointer-events-none absolute left-[-100px] top-[-100px] h-80 w-80 rounded-full bg-cyan-300/15 blur-[100px]" />

          <div className="pointer-events-none absolute right-[-100px] bottom-[-100px] h-80 w-80 rounded-full bg-indigo-950/20 blur-[100px]" />

          <div className="page-container relative">

            <div className="mx-auto grid w-full max-w-[1320px] grid-cols-1 gap-6 md:grid-cols-3">

              <div className="min-w-0 rounded-3xl border border-white/15 bg-white/10 p-6 text-center backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/15">

                <Zap size={25} className="mx-auto text-cyan-200" />

                <h3 className="mt-4 text-lg font-black text-white">
                  Smarter Decisions
                </h3>

                <p className="mt-2 text-sm leading-6 text-blue-100">
                  Use academic insights to understand what deserves your attention.
                </p>

              </div>

              <div className="min-w-0 rounded-3xl border border-white/15 bg-white/10 p-6 text-center backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/15">

                <Brain size={25} className="mx-auto text-cyan-200" />

                <h3 className="mt-4 text-lg font-black text-white">
                  Personalized Learning
                </h3>

                <p className="mt-2 text-sm leading-6 text-blue-100">
                  Recommendations adapt around academic progress and activities.
                </p>

              </div>

              <div className="min-w-0 rounded-3xl border border-white/15 bg-white/10 p-6 text-center backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:bg-white/15">

                <Target size={25} className="mx-auto text-cyan-200" />

                <h3 className="mt-4 text-lg font-black text-white">
                  Productive Time
                </h3>

                <p className="mt-2 text-sm leading-6 text-blue-100">
                  Turn available time into meaningful preparation and growth.
                </p>

              </div>

            </div>

          </div>
        </section>

        {/* ========================= FINAL CTA ========================= */}

        <section className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-950 py-24 sm:py-28">

          <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] max-w-[100vw] -translate-x-1/2 rounded-full bg-blue-500/15 blur-[120px]" />

          <div className="pointer-events-none absolute bottom-[-150px] left-[-100px] h-[350px] w-[350px] rounded-full bg-cyan-500/10 blur-[100px]" />

          <div className="page-container relative">

            <div className="mx-auto max-w-4xl text-center">

              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/10 text-cyan-300 shadow-2xl backdrop-blur-xl">
                <Brain size={29} />
              </div>

              <p className="mt-7 text-xs font-extrabold uppercase tracking-[0.25em] text-cyan-300">
                Start Today
              </p>

              <h2 className="mt-4 text-4xl font-black leading-tight tracking-tight text-white sm:text-6xl">
                Make every learning
                <br />

                <span className="text-cyan-300">
                  moment count.
                </span>
              </h2>

              <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-slate-300 sm:text-base">
                Manage academics, understand your performance and discover
                smarter ways to improve with EduAI.
              </p>

              <Link
                to="/login"
                className="group mt-9 inline-flex items-center gap-3 rounded-2xl bg-white px-8 py-4 text-sm font-extrabold text-blue-700 shadow-2xl transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-50"
              >
                Get Started

                <ArrowRight
                  size={18}
                  className="transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>

            </div>

          </div>
        </section>

      </main>

      {/* ========================= FOOTER ========================= */}

      <footer className="border-t border-white/70 bg-white/70 backdrop-blur-2xl">

        <div className="page-container flex min-h-[80px] flex-col items-center justify-center gap-3 py-5 text-center sm:flex-row sm:justify-between">

          <Link
            to="/"
            className="flex items-center gap-2"
          >

            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-cyan-500 text-white">
              <Brain size={16} />
            </div>

            <span className="font-extrabold text-slate-800">
              Edu<span className="text-blue-600">AI</span>
            </span>

          </Link>

          <p className="text-xs font-medium text-slate-400 sm:text-sm">
            © 2026 EduAI — Intelligent Personalized Learning Platform
          </p>

        </div>

      </footer>

    </div>
  );
}

export default Landing;