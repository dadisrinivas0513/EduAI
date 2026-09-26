import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Clock,
  FileQuestion,
} from "lucide-react";
import { supabase } from "../lib/supabaseClient";

export default function Tests() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTests();

    // Real-time updates
    const channel = supabase
      .channel("tests-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "tests",
        },
        () => {
          loadTests();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadTests = async () => {
    const { data, error } = await supabase
      .from("tests")
      .select("*")
      .order("test_date", { ascending: true });

    if (error) {
      console.error("Tests error:", error);
    } else {
      setTests(data || []);
    }

    setLoading(false);
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const formatTime = (date) =>
    new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });

  return (
    <div className="min-h-screen bg-slate-50">
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-7xl items-center gap-4 px-6 py-5">
          <Link
            to="/student"
            className="rounded-xl p-2 text-slate-500 hover:bg-slate-100"
          >
            <ArrowLeft size={20} />
          </Link>

          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              Tests
            </h1>
            <p className="text-sm text-slate-500">
              Upcoming and scheduled academic tests
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {loading ? (
          <Loading />
        ) : tests.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {tests.map((test) => (
              <div
                key={test.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="rounded-xl bg-indigo-50 p-3 text-indigo-600">
                    <FileQuestion size={22} />
                  </div>

                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-600">
                    {test.status}
                  </span>
                </div>

                <h2 className="mt-5 text-lg font-bold text-slate-900">
                  {test.title}
                </h2>

                <p className="mt-1 text-sm font-medium text-indigo-600">
                  {test.subject}
                </p>

                <div className="mt-5 space-y-3 border-t pt-4 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <CalendarDays size={16} />
                    {formatDate(test.test_date)}
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    {formatTime(test.test_date)}
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Duration</span>
                    <span className="font-semibold text-slate-700">
                      {test.duration} minutes
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span>Total Marks</span>
                    <span className="font-semibold text-slate-700">
                      {test.total_marks}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function Loading() {
  return (
    <div className="flex justify-center py-20">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
    </div>
  );
}

function EmptyState() {
  return (
    <div className="rounded-2xl bg-white p-12 text-center shadow-sm">
      <FileQuestion className="mx-auto text-slate-300" size={42} />

      <h2 className="mt-4 text-lg font-bold text-slate-800">
        No tests scheduled
      </h2>

      <p className="mt-2 text-sm text-slate-500">
        New tests will appear here automatically.
      </p>
    </div>
  );
}