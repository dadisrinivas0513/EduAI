import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Users,
  FileText,
  ClipboardCheck,
  TrendingUp,
  BookOpen,
  Calendar,
  RefreshCw,
  Activity,
} from "lucide-react";
import { supabase } from "../lib/supabaseClient";

export default function FacultyAnalytics() {
  const [tests, setTests] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [studentCount, setStudentCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAnalytics = async () => {
    setLoading(true);
    setError("");

    const [
      { data: testData, error: testError },
      { data: assignmentData, error: assignmentError },
      { count, error: studentError },
    ] = await Promise.all([
      supabase
        .from("tests")
        .select("*")
        .order("test_date", { ascending: false }),

      supabase
        .from("assignments")
        .select("*")
        .order("due_date", { ascending: false }),

      supabase
        .from("students")
        .select("*", { count: "exact", head: true }),
    ]);

    if (testError || assignmentError || studentError) {
      const messages = [
        testError?.message,
        assignmentError?.message,
        studentError?.message,
      ].filter(Boolean);

      setError(messages.join(" | "));
    }

    setTests(testData || []);
    setAssignments(assignmentData || []);
    setStudentCount(count || 0);

    setLoading(false);
  };

  useEffect(() => {
    loadAnalytics();

    const testsChannel = supabase
      .channel("faculty-analytics-tests")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "tests",
        },
        () => {
          loadAnalytics();
        }
      )
      .subscribe();

    const assignmentsChannel = supabase
      .channel("faculty-analytics-assignments")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "assignments",
        },
        () => {
          loadAnalytics();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(testsChannel);
      supabase.removeChannel(assignmentsChannel);
    };
  }, []);

  const subjects = useMemo(() => {
    const subjectActivity = {};

    tests.forEach((test) => {
      const subject = test.subject || "Unknown Subject";

      if (!subjectActivity[subject]) {
        subjectActivity[subject] = {
          tests: 0,
          assignments: 0,
        };
      }

      subjectActivity[subject].tests += 1;
    });

    assignments.forEach((assignment) => {
      const subject = assignment.subject || "Unknown Subject";

      if (!subjectActivity[subject]) {
        subjectActivity[subject] = {
          tests: 0,
          assignments: 0,
        };
      }

      subjectActivity[subject].assignments += 1;
    });

    return Object.entries(subjectActivity).sort((a, b) => {
      const totalA = a[1].tests + a[1].assignments;
      const totalB = b[1].tests + b[1].assignments;

      return totalB - totalA;
    });
  }, [tests, assignments]);

  const totalActivities = tests.length + assignments.length;

  const upcomingTests = tests.filter(
    (test) => new Date(test.test_date) > new Date()
  ).length;

  const activeAssignments = assignments.filter(
    (assignment) =>
      assignment.status === "Active" &&
      new Date(assignment.due_date) > new Date()
  ).length;

  const recentActivities = useMemo(() => {
    return [
      ...tests.map((item) => ({
        id: `test-${item.id}`,
        title: item.title,
        subject: item.subject,
        type: "Test",
        date: item.created_at || item.test_date,
      })),

      ...assignments.map((item) => ({
        id: `assignment-${item.id}`,
        title: item.title,
        subject: item.subject,
        type: "Assignment",
        date: item.created_at || item.due_date,
      })),
    ]
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, 8);
  }, [tests, assignments]);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-sky-50 via-white to-indigo-50 text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3">
            <Link
              to="/faculty"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50"
              title="Back to Faculty Dashboard"
            >
              <ArrowLeft size={19} />
            </Link>

            <div className="min-w-0">
              <h1 className="truncate text-lg font-bold text-slate-900 sm:text-xl">
                Faculty Analytics
              </h1>

              <p className="hidden text-xs text-slate-500 sm:block">
                Academic activity overview
              </p>
            </div>
          </div>

          <button
            onClick={loadAnalytics}
            disabled={loading}
            title="Refresh analytics"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 disabled:opacity-50"
          >
            <RefreshCw
              size={17}
              className={loading ? "animate-spin" : ""}
            />
          </button>
        </div>
      </header>

      <main className="mx-auto w-full max-w-7xl px-4 py-7 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        {/* Heading */}
        <section className="mb-7">
          <p className="text-sm font-semibold text-blue-600">
            Faculty Workspace
          </p>

          <h2 className="mt-1 text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
            Academic Analytics
          </h2>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500 sm:text-base">
            Monitor tests, assignments, students and academic activity
            across your subjects.
          </p>
        </section>

        {error && (
          <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {loading ? (
          <div className="rounded-2xl border border-slate-200 bg-white p-14 text-center shadow-sm">
            <RefreshCw
              size={25}
              className="mx-auto animate-spin text-blue-600"
            />

            <p className="mt-4 text-sm text-slate-500">
              Loading analytics...
            </p>
          </div>
        ) : (
          <>
            {/* Stats */}
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <StatCard
                icon={Users}
                title="Total Students"
                value={studentCount}
                description="Registered students"
                iconClass="bg-blue-50 text-blue-600"
              />

              <StatCard
                icon={ClipboardCheck}
                title="Total Tests"
                value={tests.length}
                description={`${upcomingTests} upcoming`}
                iconClass="bg-indigo-50 text-indigo-600"
              />

              <StatCard
                icon={FileText}
                title="Assignments"
                value={assignments.length}
                description={`${activeAssignments} active`}
                iconClass="bg-emerald-50 text-emerald-600"
              />

              <StatCard
                icon={Activity}
                title="Total Activities"
                value={totalActivities}
                description="Tests + assignments"
                iconClass="bg-amber-50 text-amber-600"
              />
            </section>

            {/* Main analytics */}
            <section className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
              {/* Subject activity */}
              <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                    <BookOpen size={20} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-bold text-slate-900">
                      Subject-wise Activity
                    </h3>

                    <p className="text-sm text-slate-500">
                      Tests and assignments by subject
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  {subjects.length === 0 ? (
                    <EmptyAnalytics text="No academic activity available." />
                  ) : (
                    <div className="space-y-3">
                      {subjects.map(([subject, activity]) => {
                        const total =
                          activity.tests + activity.assignments;

                        return (
                          <div
                            key={subject}
                            className="min-w-0 rounded-xl bg-slate-50 p-4"
                          >
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                              <p className="min-w-0 break-words font-semibold text-slate-800">
                                {subject}
                              </p>

                              <span className="shrink-0 text-xs font-bold text-blue-600">
                                {total}{" "}
                                {total === 1
                                  ? "activity"
                                  : "activities"}
                              </span>
                            </div>

                            <div className="mt-3 flex flex-wrap gap-2">
                              <span className="rounded-full bg-indigo-50 px-3 py-1 text-xs font-semibold text-indigo-600">
                                {activity.tests} Tests
                              </span>

                              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                                {activity.assignments} Assignments
                              </span>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>

              {/* Recent activity */}
              <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <Calendar size={20} />
                  </div>

                  <div className="min-w-0">
                    <h3 className="font-bold text-slate-900">
                      Recent Academic Activity
                    </h3>

                    <p className="text-sm text-slate-500">
                      Latest tests and assignments
                    </p>
                  </div>
                </div>

                <div className="mt-6">
                  {recentActivities.length === 0 ? (
                    <EmptyAnalytics text="No recent activity available." />
                  ) : (
                    <div className="space-y-3">
                      {recentActivities.map((item) => (
                        <div
                          key={item.id}
                          className="flex min-w-0 items-center gap-3 rounded-xl border border-slate-100 p-3"
                        >
                          <div
                            className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${
                              item.type === "Test"
                                ? "bg-indigo-50 text-indigo-600"
                                : "bg-emerald-50 text-emerald-600"
                            }`}
                          >
                            {item.type === "Test" ? (
                              <ClipboardCheck size={17} />
                            ) : (
                              <FileText size={17} />
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-semibold text-slate-800">
                              {item.title}
                            </p>

                            <p className="mt-0.5 truncate text-xs text-slate-500">
                              {item.subject}
                            </p>
                          </div>

                          <span
                            className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${
                              item.type === "Test"
                                ? "bg-indigo-50 text-indigo-600"
                                : "bg-emerald-50 text-emerald-600"
                            }`}
                          >
                            {item.type}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </section>

            {/* Activity summary */}
            <section className="mt-6 rounded-2xl border border-blue-100 bg-blue-50 p-5 sm:p-6">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-blue-600 shadow-sm">
                  <TrendingUp size={20} />
                </div>

                <div className="min-w-0">
                  <h3 className="font-bold text-blue-900">
                    Academic Activity Summary
                  </h3>

                  <p className="mt-1 text-sm leading-6 text-blue-700">
                    EduAI currently tracks {tests.length} tests and{" "}
                    {assignments.length} assignments across{" "}
                    {subjects.length} active subjects.
                  </p>
                </div>
              </div>
            </section>
          </>
        )}

        <div className="h-10" />
      </main>
    </div>
  );
}

function StatCard({
  icon: Icon,
  title,
  value,
  description,
  iconClass,
}) {
  return (
    <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-slate-500">
            {title}
          </p>

          <p className="mt-2 text-3xl font-extrabold text-slate-900">
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

function EmptyAnalytics({ text }) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-5 py-10 text-center">
      <p className="text-sm text-slate-500">{text}</p>
    </div>
  );
}