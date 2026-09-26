import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, CalendarDays, ClipboardCheck, Clock } from "lucide-react";
import { supabase } from "../lib/supabaseClient";

export default function Assignments() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAssignments();

    // Real-time updates
    const channel = supabase
      .channel("assignments-realtime")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "assignments",
        },
        () => {
          loadAssignments();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadAssignments = async () => {
    const { data, error } = await supabase
      .from("assignments")
      .select("*")
      .order("due_date", { ascending: true });

    if (error) {
      console.error("Assignments error:", error);
    } else {
      setAssignments(data || []);
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
              Assignments
            </h1>
            <p className="text-sm text-slate-500">
              Your current academic assignments
            </p>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {loading ? (
          <Loading />
        ) : assignments.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {assignments.map((assignment) => (
              <div
                key={assignment.id}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                    <ClipboardCheck size={22} />
                  </div>

                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                    {assignment.status}
                  </span>
                </div>

                <h2 className="mt-5 text-lg font-bold text-slate-900">
                  {assignment.title}
                </h2>

                <p className="mt-1 text-sm font-medium text-blue-600">
                  {assignment.subject}
                </p>

                <p className="mt-3 text-sm leading-6 text-slate-500">
                  {assignment.description}
                </p>

                <div className="mt-5 space-y-2 border-t pt-4 text-sm text-slate-500">
                  <div className="flex items-center gap-2">
                    <CalendarDays size={16} />
                    Due: {formatDate(assignment.due_date)}
                  </div>

                  <div className="flex items-center gap-2">
                    <Clock size={16} />
                    {formatTime(assignment.due_date)}
                  </div>

                  <div className="font-medium text-slate-700">
                    Maximum Marks: {assignment.max_marks}
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
      <ClipboardCheck className="mx-auto text-slate-300" size={42} />
      <h2 className="mt-4 text-lg font-bold text-slate-800">
        No assignments
      </h2>
      <p className="mt-2 text-sm text-slate-500">
        New assignments will appear here automatically.
      </p>
    </div>
  );
}