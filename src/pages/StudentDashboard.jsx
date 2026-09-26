import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Activity,
  ArrowRight,
  BarChart3,
  BookOpen,
  Bot,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Code2,
  Cpu,
  GraduationCap,
  LogOut,
  Network,
  Sparkles,
  Trophy,
  User,
} from "lucide-react";
import { supabase } from "../lib/supabaseClient";

export default function StudentDashboard() {
  const navigate = useNavigate();

  const [student, setStudent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStudent();
  }, []);

  const loadStudent = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login");
        return;
      }

      const { data, error } = await supabase
        .from("students")
        .select("*")
        .eq("email", user.email)
        .single();

      if (error) {
        console.error("Student data error:", error);
        return;
      }

      setStudent(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="dashboard-page flex min-h-screen items-center justify-center px-4">
        <BackgroundDecor />

        <div className="relative z-10 rounded-3xl border border-white/80 bg-white/75 px-8 py-8 text-center shadow-[0_25px_70px_rgba(30,64,175,0.12)] backdrop-blur-xl">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-200">
            <GraduationCap size={24} />
          </div>

          <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-blue-100 border-t-blue-600" />

          <p className="text-sm font-medium text-slate-600">
            Loading your EduAI dashboard...
          </p>
        </div>

        <DashboardStyles />
      </div>
    );
  }

  if (!student) {
    return (
      <div className="dashboard-page flex min-h-screen items-center justify-center px-4">
        <BackgroundDecor />

        <div className="relative z-10 w-full max-w-md rounded-3xl border border-white/80 bg-white/80 p-8 text-center shadow-[0_25px_70px_rgba(30,64,175,0.14)] backdrop-blur-xl">
          <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-red-500">
            <User size={25} />
          </div>

          <h2 className="text-xl font-bold text-slate-900">
            Student record not found
          </h2>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Your login is valid, but your student profile is not available.
          </p>

          <button
            onClick={handleLogout}
            className="mt-6 rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-200 transition hover:bg-blue-700"
          >
            Back to Login
          </button>
        </div>

        <DashboardStyles />
      </div>
    );
  }

  const firstName = student.full_name?.split(" ")[0] || "Student";

  return (
    <div className="dashboard-page min-h-screen overflow-x-hidden">
      <BackgroundDecor />

      {/* =========================================================
          NAVBAR
      ========================================================== */}
      <nav className="relative z-20 border-b border-white/70 bg-white/75 backdrop-blur-xl">
        <div className="mx-auto flex min-h-[72px] w-full max-w-[1280px] items-center justify-between px-4 sm:px-6 lg:px-8">
          {/* Logo */}
          <Link
            to="/student"
            className="flex min-w-0 items-center gap-3"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-lg shadow-blue-200">
              <BookOpen size={20} />
            </div>

            <div className="min-w-0">
              <h1 className="text-lg font-extrabold tracking-tight text-slate-900 sm:text-xl">
                EduAI
              </h1>

              <p className="hidden text-[11px] font-medium text-slate-400 sm:block">
                Intelligent Learning Platform
              </p>
            </div>
          </Link>

          {/* User area */}
          <div className="flex items-center gap-2 sm:gap-4">
            <div className="hidden min-w-0 text-right md:block">
              <p className="max-w-[220px] truncate text-sm font-bold text-slate-800">
                {student.full_name}
              </p>

              <p className="max-w-[220px] truncate text-xs text-slate-500">
                {student.department} • {student.year}
              </p>
            </div>

            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-blue-100 bg-gradient-to-br from-blue-50 to-indigo-100 font-bold text-blue-700 shadow-sm">
              {firstName.charAt(0).toUpperCase()}
            </div>

            <button
              onClick={handleLogout}
              title="Logout"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-500 transition hover:bg-red-50 hover:text-red-600"
            >
              <LogOut size={19} />
            </button>
          </div>
        </div>
      </nav>

      {/* =========================================================
          MAIN CONTENT
      ========================================================== */}
      <main className="relative z-10 mx-auto w-full max-w-[1280px] px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">

        {/* =====================================================
            WELCOME HERO
        ====================================================== */}
        <section className="mb-7">
          <div className="relative isolate overflow-hidden rounded-[28px] border border-white/60 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 p-6 text-white shadow-[0_25px_70px_rgba(37,99,235,0.22)] sm:p-8 lg:p-9">

            {/* Decorative glow */}
            <div className="pointer-events-none absolute -right-20 -top-24 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-24 left-1/3 h-56 w-56 rounded-full bg-cyan-300/10 blur-3xl" />

            {/* Grid pattern */}
            <div className="hero-grid pointer-events-none absolute inset-0 opacity-[0.08]" />

            <div className="relative flex flex-col gap-7 lg:flex-row lg:items-center lg:justify-between">

              {/* Welcome content */}
              <div className="min-w-0 max-w-3xl">
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold text-blue-50 backdrop-blur-md">
                  <Sparkles size={14} />
                  Personalized Learning
                </div>

                <h2 className="break-words text-2xl font-extrabold tracking-tight sm:text-3xl lg:text-4xl">
                  Welcome back, {firstName}! 👋
                </h2>

                <p className="mt-3 max-w-2xl text-sm leading-6 text-blue-50 sm:text-base">
                  Keep learning, complete your activities and build your
                  academic progress with EduAI.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  <HeroBadge icon={<Activity size={14} />}>
                    Learning Active
                  </HeroBadge>

                  <HeroBadge icon={<Bot size={14} />}>
                    AI Powered
                  </HeroBadge>

                  <HeroBadge icon={<CheckCircle2 size={14} />}>
                    Personalized
                  </HeroBadge>
                </div>
              </div>

              {/* Credits */}
              <div className="relative w-full shrink-0 sm:w-auto lg:min-w-[190px]">
                <div className="rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-xl">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-xs font-medium text-blue-100">
                        EduAI Credits
                      </p>

                      <p className="mt-1 break-all text-3xl font-extrabold tracking-tight">
                        {student.credits}
                      </p>
                    </div>

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/15">
                      <Sparkles size={21} />
                    </div>
                  </div>

                  <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-white/15">
                    <div className="h-full w-[68%] rounded-full bg-white/80" />
                  </div>

                  <p className="mt-2 text-[11px] text-blue-100">
                    Keep completing activities to earn more.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            STUDENT INFORMATION
        ====================================================== */}
        <section className="mb-7">
          <div className="mb-4">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
              Student Profile
            </p>

            <h3 className="mt-1 text-xl font-extrabold tracking-tight text-slate-900">
              Your Academic Information
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            <InfoCard
              icon={<User size={20} />}
              iconStyle="blue"
              title="Registration Number"
              value={student.registration_number}
            />

            <InfoCard
              icon={<BookOpen size={20} />}
              iconStyle="indigo"
              title="Department"
              value={student.department}
            />

            <InfoCard
              icon={<CalendarDays size={20} />}
              iconStyle="emerald"
              title="Academic Year"
              value={student.year}
            />
          </div>
        </section>

        {/* =====================================================
            STATS
        ====================================================== */}
        <section className="mb-8">
          <div className="mb-4">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
              Overview
            </p>

            <h3 className="mt-1 text-xl font-extrabold tracking-tight text-slate-900">
              Learning Snapshot
            </h3>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <StatCard
              icon={<BookOpen size={20} />}
              title="Subjects"
              value="6"
              description="This semester"
            />

            <StatCard
              icon={<ClipboardCheck size={20} />}
              title="Assignments"
              value="4"
              description="Active"
            />

            <StatCard
              icon={<BarChart3 size={20} />}
              title="Average Score"
              value="82%"
              description="Current performance"
            />

            <StatCard
              icon={<Trophy size={20} />}
              title="Credits"
              value={student.credits}
              description="Learning credits"
            />
          </div>
        </section>

        {/* =====================================================
            WORKSPACE
        ====================================================== */}
        <section>
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-[0.18em] text-blue-600">
              EduAI Tools
            </p>

            <h3 className="mt-1 text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
              Student Workspace
            </h3>

            <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
              Access your academic activities and personalized learning tools.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">

            <WorkspaceCard
              to="/student/subjects"
              icon={<BookOpen size={22} />}
              title="My Subjects"
              description="View subjects, faculty and learning progress."
            />

            <WorkspaceCard
              to="/student/assignments"
              icon={<ClipboardCheck size={22} />}
              title="Assignments"
              description="Track upcoming and completed assignments."
            />

            <WorkspaceCard
              to="/student/tests"
              icon={<CalendarDays size={22} />}
              title="Tests"
              description="View scheduled tests and examination timings."
            />

            <WorkspaceCard
              to="/student/challenge"
              icon={<Trophy size={22} />}
              title="Daily Challenge"
              description="Practice aptitude, coding and interview skills in your free time."
            />

            <WorkspaceCard
              to="/student/analytics"
              icon={<BarChart3 size={22} />}
              title="My Analytics"
              description="Understand your academic performance and progress."
            />

            {/* Smart Time Card */}
            <div className="workspace-card relative flex min-h-[250px] flex-col overflow-hidden rounded-[22px] border border-blue-200/70 bg-gradient-to-br from-blue-600 via-indigo-600 to-violet-600 p-6 text-white shadow-[0_18px_45px_rgba(37,99,235,0.18)]">

              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-white/10 blur-2xl" />

              <div className="relative flex h-full flex-col">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/15 backdrop-blur-md">
                  <Sparkles size={22} />
                </div>

                <h4 className="mt-5 text-lg font-extrabold">
                  Smart Time Utilization
                </h4>

                <p className="mt-2 flex-1 text-sm leading-6 text-blue-50">
                  No academic activity right now? Turn your free time into
                  useful learning credits.
                </p>

                <Link
                  to="/student/challenge"
                  className="mt-5 inline-flex w-fit items-center gap-2 rounded-xl bg-blue-500 px-4 py-2.5 text-sm font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-blue-600"
                >
                  Start Learning
                  <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Bottom spacing */}
        <div className="h-8" />
      </main>

      <DashboardStyles />
    </div>
  );
}

/* =============================================================
   HERO BADGE
============================================================= */

function HeroBadge({ icon, children }) {
  return (
    <div className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-2.5 py-1.5 text-[11px] font-semibold text-white backdrop-blur-md">
      {icon}
      {children}
    </div>
  );
}

/* =============================================================
   INFORMATION CARD
============================================================= */

function InfoCard({ icon, iconStyle, title, value }) {
  const styles = {
    blue: "bg-blue-50 text-blue-600",
    indigo: "bg-indigo-50 text-indigo-600",
    emerald: "bg-emerald-50 text-emerald-600",
  };

  return (
    <div className="group min-w-0 rounded-[20px] border border-slate-200/80 bg-white/85 p-5 shadow-[0_10px_35px_rgba(15,23,42,0.05)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_18px_45px_rgba(37,99,235,0.10)]">
      <div className="flex min-w-0 items-center gap-4">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${styles[iconStyle]}`}
        >
          {icon}
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium text-slate-400">
            {title}
          </p>

          <p className="mt-1 break-words text-sm font-bold leading-5 text-slate-800">
            {value || "Not available"}
          </p>
        </div>
      </div>
    </div>
  );
}

/* =============================================================
   STAT CARD
============================================================= */

function StatCard({ icon, title, value, description }) {
  return (
    <div className="group min-w-0 rounded-[20px] border border-slate-200/80 bg-white/85 p-5 shadow-[0_10px_35px_rgba(15,23,42,0.05)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-[0_18px_45px_rgba(37,99,235,0.10)]">

      <div className="flex min-h-[42px] items-start justify-between">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
          {icon}
        </div>

        <div className="rounded-full bg-emerald-50 px-2 py-1 text-[10px] font-bold text-emerald-600">
          Active
        </div>
      </div>

      <p className="mt-4 text-sm font-medium text-slate-500">
        {title}
      </p>

      <p className="mt-1 break-words text-2xl font-extrabold tracking-tight text-slate-900">
        {value}
      </p>

      <p className="mt-1 break-words text-xs text-slate-400">
        {description}
      </p>
    </div>
  );
}

/* =============================================================
   WORKSPACE CARD
============================================================= */

function WorkspaceCard({ to, icon, title, description }) {
  return (
    <Link
      to={to}
      className="workspace-card group flex min-h-[250px] min-w-0 flex-col rounded-[22px] border border-slate-200/80 bg-white/85 p-6 shadow-[0_10px_35px_rgba(15,23,42,0.05)] backdrop-blur-xl transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_22px_50px_rgba(37,99,235,0.12)]"
    >
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition duration-300 group-hover:bg-blue-600 group-hover:text-white">
        {icon}
      </div>

      <h4 className="mt-5 break-words text-lg font-extrabold leading-6 text-slate-900">
        {title}
      </h4>

      <p className="mt-2 flex-1 break-words text-sm leading-6 text-slate-500">
        {description}
      </p>

      <div className="mt-5 flex items-center gap-2 text-sm font-bold text-blue-600">
        Open
        <ArrowRight
          size={16}
          className="transition-transform duration-300 group-hover:translate-x-1"
        />
      </div>
    </Link>
  );
}

/* =============================================================
   FUTURISTIC BACKGROUND
============================================================= */

function BackgroundDecor() {
  return (
    <div className="dashboard-background pointer-events-none fixed inset-0 overflow-hidden">
      {/* Main soft gradients */}
      <div className="bg-orb bg-orb-one" />
      <div className="bg-orb bg-orb-two" />
      <div className="bg-orb bg-orb-three" />

      {/* Technical grid */}
      <div className="tech-grid absolute inset-0 opacity-60" />

      {/* Floating technology elements */}
      <div className="tech-float tech-one">
        <Code2 size={18} />
      </div>

      <div className="tech-float tech-two">
        <Bot size={20} />
      </div>

      <div className="tech-float tech-three">
        <Cpu size={18} />
      </div>

      <div className="tech-float tech-four">
        <Network size={19} />
      </div>

      <div className="tech-float tech-five">
        <Sparkles size={17} />
      </div>

      {/* Small glowing nodes */}
      <span className="tech-node node-one" />
      <span className="tech-node node-two" />
      <span className="tech-node node-three" />
      <span className="tech-node node-four" />
    </div>
  );
}

/* =============================================================
   CUSTOM CSS
============================================================= */

function DashboardStyles() {
  return (
    <style>{`
      /* -------------------------------------------------------
         PAGE
      ------------------------------------------------------- */

      .dashboard-page {
        position: relative;
        background:
          linear-gradient(
            135deg,
            #f4faff 0%,
            #eef6ff 35%,
            #f5f3ff 68%,
            #f8fbff 100%
          );
        color: #0f172a;
      }

      /* -------------------------------------------------------
         BACKGROUND
      ------------------------------------------------------- */

      .dashboard-background {
        z-index: 0;
        background:
          radial-gradient(
            circle at 10% 15%,
            rgba(56, 189, 248, 0.10),
            transparent 24%
          ),
          radial-gradient(
            circle at 90% 10%,
            rgba(99, 102, 241, 0.10),
            transparent 24%
          ),
          radial-gradient(
            circle at 50% 90%,
            rgba(14, 165, 233, 0.08),
            transparent 28%
          );
      }

      .bg-orb {
        position: absolute;
        border-radius: 9999px;
        filter: blur(70px);
        opacity: 0.35;
        animation: orbFloat 12s ease-in-out infinite;
      }

      .bg-orb-one {
        width: 260px;
        height: 260px;
        left: -100px;
        top: 18%;
        background: rgba(56, 189, 248, 0.22);
      }

      .bg-orb-two {
        width: 300px;
        height: 300px;
        right: -120px;
        top: 38%;
        background: rgba(129, 140, 248, 0.20);
        animation-delay: -4s;
      }

      .bg-orb-three {
        width: 220px;
        height: 220px;
        left: 42%;
        bottom: -100px;
        background: rgba(34, 211, 238, 0.14);
        animation-delay: -8s;
      }

      .tech-grid {
        background-image:
          linear-gradient(
            rgba(59, 130, 246, 0.045) 1px,
            transparent 1px
          ),
          linear-gradient(
            90deg,
            rgba(59, 130, 246, 0.045) 1px,
            transparent 1px
          );
        background-size: 44px 44px;
        mask-image: linear-gradient(
          to bottom,
          transparent,
          black 15%,
          black 80%,
          transparent
        );
      }

      /* -------------------------------------------------------
         FLOATING TECH ICONS
      ------------------------------------------------------- */

      .tech-float {
        position: absolute;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 42px;
        height: 42px;
        border: 1px solid rgba(255, 255, 255, 0.9);
        border-radius: 14px;
        color: rgba(37, 99, 235, 0.38);
        background: rgba(255, 255, 255, 0.48);
        box-shadow:
          0 12px 35px rgba(37, 99, 235, 0.08),
          inset 0 1px 0 rgba(255, 255, 255, 0.8);
        backdrop-filter: blur(12px);
        animation: techFloat 7s ease-in-out infinite;
      }

      .tech-one {
        left: 7%;
        top: 25%;
      }

      .tech-two {
        right: 7%;
        top: 25%;
        animation-delay: -2s;
      }

      .tech-three {
        right: 12%;
        bottom: 18%;
        animation-delay: -4s;
      }

      .tech-four {
        left: 10%;
        bottom: 20%;
        animation-delay: -1s;
      }

      .tech-five {
        left: 47%;
        top: 13%;
        animation-delay: -5s;
      }

      .tech-node {
        position: absolute;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background: rgba(37, 99, 235, 0.30);
        box-shadow: 0 0 18px rgba(37, 99, 235, 0.35);
        animation: nodePulse 3s ease-in-out infinite;
      }

      .node-one {
        left: 18%;
        top: 18%;
      }

      .node-two {
        right: 20%;
        top: 42%;
        animation-delay: -1s;
      }

      .node-three {
        left: 25%;
        bottom: 18%;
        animation-delay: -2s;
      }

      .node-four {
        right: 8%;
        bottom: 12%;
        animation-delay: -0.5s;
      }

      /* -------------------------------------------------------
         HERO GRID
      ------------------------------------------------------- */

      .hero-grid {
        background-image:
          linear-gradient(
            rgba(255, 255, 255, 0.15) 1px,
            transparent 1px
          ),
          linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.15) 1px,
            transparent 1px
          );
        background-size: 34px 34px;
      }

      /* -------------------------------------------------------
         ANIMATIONS
      ------------------------------------------------------- */

      @keyframes orbFloat {
        0%,
        100% {
          transform: translate3d(0, 0, 0) scale(1);
        }

        50% {
          transform: translate3d(18px, -16px, 0) scale(1.06);
        }
      }

      @keyframes techFloat {
        0%,
        100% {
          transform: translate3d(0, 0, 0) rotate(0deg);
        }

        50% {
          transform: translate3d(0, -12px, 0) rotate(2deg);
        }
      }

      @keyframes nodePulse {
        0%,
        100% {
          transform: scale(1);
          opacity: 0.45;
        }

        50% {
          transform: scale(1.7);
          opacity: 0.9;
        }
      }

      /* -------------------------------------------------------
         RESPONSIVE
      ------------------------------------------------------- */

      @media (max-width: 768px) {
        .tech-float {
          opacity: 0.45;
          transform: scale(0.8);
        }

        .tech-five,
        .tech-three {
          display: none;
        }
      }

      /* -------------------------------------------------------
         ACCESSIBILITY
      ------------------------------------------------------- */

      @media (prefers-reduced-motion: reduce) {
        .bg-orb,
        .tech-float,
        .tech-node {
          animation: none !important;
        }

        .workspace-card {
          transition: none !important;
        }
      }
    `}</style>
  );
}