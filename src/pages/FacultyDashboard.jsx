import { useEffect, useState } from "react";
import {
  Users,
  BookOpen,
  ClipboardCheck,
  BarChart3,
  FileText,
  Plus,
  ArrowRight,
  LogOut,
  RefreshCw,
  CalendarDays,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabaseClient";

function FacultyDashboard() {
  const navigate = useNavigate();

  const [studentCount, setStudentCount] = useState(0);
  const [assignmentCount, setAssignmentCount] = useState(0);
  const [testCount, setTestCount] = useState(0);
  const [upcomingTests, setUpcomingTests] = useState(0);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDashboard = async () => {
    setLoading(true);

    const [
      { count: students },
      { data: assignments },
      { data: tests },
    ] = await Promise.all([
      supabase
        .from("students")
        .select("*", { count: "exact", head: true }),

      supabase
        .from("assignments")
        .select("*")
        .order("created_at", { ascending: false }),

      supabase
        .from("tests")
        .select("*")
        .order("created_at", { ascending: false }),
    ]);

    setStudentCount(students || 0);

    const assignmentList = assignments || [];
    const testList = tests || [];

    setAssignmentCount(assignmentList.length);
    setTestCount(testList.length);

    setUpcomingTests(
      testList.filter(
        (test) => new Date(test.test_date) > new Date()
      ).length
    );

    const combinedActivities = [
      ...testList.map((item) => ({
        id: `test-${item.id}`,
        title: item.title,
        subject: item.subject,
        type: "Test",
        date: item.created_at || item.test_date,
      })),

      ...assignmentList.map((item) => ({
        id: `assignment-${item.id}`,
        title: item.title,
        subject: item.subject,
        type: "Assignment",
        date: item.created_at || item.due_date,
      })),
    ]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 5);

    setActivities(combinedActivities);
    setLoading(false);
  };

  useEffect(() => {
    loadDashboard();

    const testsChannel = supabase
      .channel("faculty-dashboard-tests")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "tests",
        },
        () => {
          loadDashboard();
        }
      )
      .subscribe();

    const assignmentsChannel = supabase
      .channel("faculty-dashboard-assignments")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "assignments",
        },
        () => {
          loadDashboard();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(testsChannel);
      supabase.removeChannel(assignmentsChannel);
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const actions = [
    {
      title: "Schedule Test",
      description: "Create and schedule a new test.",
      icon: FileText,
      path: "/faculty/tests",
    },
    {
      title: "Create Assignment",
      description: "Publish a new assignment.",
      icon: ClipboardCheck,
      path: "/faculty/assignments",
    },
    {
      title: "Question Bank",
      description: "Manage subject questions.",
      icon: BookOpen,
      path: "/faculty/tests",
    },
    {
      title: "View Analytics",
      description: "Analyze academic activity.",
      icon: BarChart3,
      path: "/faculty/analytics",
    },
  ];

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-sky-50 via-white to-indigo-50 text-slate-900">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <button
            onClick={() => navigate("/faculty")}
            className="text-2xl font-extrabold tracking-tight text-blue-600"
          >
            EduAI
          </button>

          <div className="flex items-center gap-3 sm:gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-slate-900">
                Faculty User
              </p>

              <p className="text-xs text-slate-500">
                CSE Department
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-sm font-bold text-white shadow-md">
              FC
            </div>

            <button
              onClick={handleLogout}
              title="Logout"
              className="flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 transition hover:bg-red-50 hover:text-red-600"
            >
              <LogOut size={19} />
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto w-full max-w-7xl px-4 py-7 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        {/* Page heading */}
        <section className="mb-8">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-blue-600">
                Faculty Dashboard
              </p>

              <h1 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl lg:text-4xl">
                Manage Your Academic Activities
              </h1>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
                Create tests, publish assignments and monitor academic
                activity from one workspace.
              </p>
            </div>

            <button
              onClick={loadDashboard}
              disabled={loading}
              className="inline-flex w-fit items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 shadow-sm transition hover:bg-slate-50 disabled:opacity-50"
            >
              <RefreshCw
                size={17}
                className={loading ? "animate-spin" : ""}
              />
              Refresh
            </button>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <DashboardStat
            title="Students"
            value={studentCount}
            description="Registered students"
            icon={Users}
            iconClass="bg-blue-50 text-blue-600"
          />

          <DashboardStat
            title="Subjects"
            value="4"
            description="Faculty subjects"
            icon={BookOpen}
            iconClass="bg-indigo-50 text-indigo-600"
          />

          <DashboardStat
            title="Assignments"
            value={assignmentCount}
            description="Created assignments"
            icon={ClipboardCheck}
            iconClass="bg-emerald-50 text-emerald-600"
          />

          <DashboardStat
            title="Upcoming Tests"
            value={upcomingTests}
            description={`${testCount} total tests`}
            icon={BarChart3}
            iconClass="bg-amber-50 text-amber-600"
          />
        </section>

        {/* Quick Actions */}
        <section className="mt-8">
          <div className="mb-4">
            <h2 className="text-xl font-bold text-slate-900">
              Quick Actions
            </h2>

            <p className="mt-1 text-sm text-slate-500">
              Frequently used faculty tools.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {actions.map((action) => {
              const Icon = action.icon;

              return (
                <button
                  key={action.title}
                  onClick={() => navigate(action.path)}
                  className="group min-w-0 rounded-2xl border border-slate-200 bg-white p-5 text-left shadow-sm transition duration-200 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                      <Icon size={21} />
                    </div>

                    <ArrowRight
                      size={18}
                      className="mt-1 shrink-0 text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600"
                    />
                  </div>

                  <h3 className="mt-5 font-bold text-slate-900">
                    {action.title}
                  </h3>

                  <p className="mt-2 text-sm leading-5 text-slate-500">
                    {action.description}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Bottom content */}
        <section className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-5">
          {/* Recent activity */}
          <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:col-span-3">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="font-bold text-slate-900">
                  Recent Activities
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Latest academic activities from the database.
                </p>
              </div>

              <CalendarDays
                size={20}
                className="shrink-0 text-blue-500"
              />
            </div>

            <div className="mt-5 space-y-3">
              {loading ? (
                <div className="py-8 text-center text-sm text-slate-500">
                  Loading activities...
                </div>
              ) : activities.length === 0 ? (
                <div className="rounded-xl bg-slate-50 px-4 py-8 text-center text-sm text-slate-500">
                  No academic activities available yet.
                </div>
              ) : (
                activities.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex min-w-0 items-center gap-3 rounded-xl bg-slate-50 p-3.5"
                  >
                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                        activity.type === "Test"
                          ? "bg-indigo-100 text-indigo-600"
                          : "bg-emerald-100 text-emerald-600"
                      }`}
                    >
                      {activity.type === "Test" ? (
                        <FileText size={17} />
                      ) : (
                        <ClipboardCheck size={17} />
                      )}
                    </div>

                    <div className="min-w-0 flex-1">
                      <p className="truncate text-sm font-semibold text-slate-800">
                        {activity.title}
                      </p>

                      <p className="mt-0.5 truncate text-xs text-slate-500">
                        {activity.subject}
                      </p>
                    </div>

                    <span
                      className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                        activity.type === "Test"
                          ? "bg-indigo-50 text-indigo-600"
                          : "bg-emerald-50 text-emerald-600"
                      }`}
                    >
                      {activity.type}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Performance */}
          <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 lg:col-span-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <BarChart3 size={20} />
              </div>

              <div>
                <h2 className="font-bold text-slate-900">
                  Class Performance
                </h2>

                <p className="text-sm text-slate-500">
                  Current performance overview
                </p>
              </div>
            </div>

            <div className="mt-7">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-4xl font-extrabold text-slate-900">
                    82%
                  </p>

                  <p className="mt-1 text-sm text-slate-500">
                    Overall class average
                  </p>
                </div>

                <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-bold text-emerald-600">
                  +6.4%
                </span>
              </div>

              <div className="mt-6 h-3 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-[82%] rounded-full bg-gradient-to-r from-blue-600 to-indigo-600" />
              </div>

              <button
                onClick={() => navigate("/faculty/analytics")}
                className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600 transition hover:text-blue-700"
              >
                View detailed analytics
                <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </section>

        {/* Bottom spacing */}
        <div className="h-20" />
      </main>

      {/* Floating action */}
      <button
        onClick={() => navigate("/faculty/tests")}
        title="Schedule Test"
        className="fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 text-white shadow-xl shadow-blue-500/30 transition hover:scale-105 hover:shadow-2xl sm:bottom-7 sm:right-7"
      >
        <Plus size={24} />
      </button>
    </div>
  );
}

function DashboardStat({
  title,
  value,
  description,
  icon: Icon,
  iconClass,
}) {
  return (
    <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-2 truncate text-3xl font-extrabold text-slate-900">
            {value}
          </p>

          <p className="mt-1 truncate text-xs text-slate-500">
            {description}
          </p>
        </div>

        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
        >
          <Icon size={21} />
        </div>
      </div>
    </div>
  );
}

export default FacultyDashboard;