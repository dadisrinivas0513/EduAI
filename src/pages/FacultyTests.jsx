import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  CheckCircle2,
  Clock,
  FileText,
  Plus,
  RefreshCw,
  X,
  ClipboardCheck,
} from "lucide-react";
import { supabase } from "../lib/supabaseClient";

export default function FacultyTests() {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const [form, setForm] = useState({
    title: "",
    subject: "",
    test_date: "",
    duration: 30,
    total_marks: 20,
  });

  const loadTests = async () => {
    setLoading(true);
    setError("");

    const { data, error } = await supabase
      .from("tests")
      .select("*")
      .order("test_date", { ascending: true });

    if (error) {
      setError(error.message);
    } else {
      setTests(data || []);
    }

    setLoading(false);
  };

  useEffect(() => {
    loadTests();

    const channel = supabase
      .channel("faculty-tests-live")
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const openForm = () => {
    setMessage("");
    setError("");
    setShowForm(true);
  };

  const closeForm = () => {
    if (!saving) {
      setShowForm(false);
    }
  };

  const handleCreateTest = async (e) => {
    e.preventDefault();

    setSaving(true);
    setMessage("");
    setError("");

    const { error } = await supabase.from("tests").insert([
      {
        title: form.title.trim(),
        subject: form.subject.trim(),
        test_date: form.test_date,
        duration: Number(form.duration),
        total_marks: Number(form.total_marks),
        status: "Upcoming",
      },
    ]);

    if (error) {
      setError(error.message);
      setSaving(false);
      return;
    }

    setMessage("Test scheduled successfully.");

    setForm({
      title: "",
      subject: "",
      test_date: "",
      duration: 30,
      total_marks: 20,
    });

    setShowForm(false);
    setSaving(false);

    await loadTests();
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  const upcomingTests = tests.filter(
    (test) => new Date(test.test_date) > new Date()
  ).length;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-sky-50 via-white to-indigo-50 text-slate-900">
      <main className="mx-auto w-full max-w-7xl px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
        {/* Header */}
        <header className="mb-7 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="flex min-w-0 items-start gap-3">
            <Link
              to="/faculty"
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50"
              title="Back to Faculty Dashboard"
            >
              <ArrowLeft size={19} />
            </Link>

            <div className="min-w-0">
              <p className="text-sm font-semibold text-blue-600">
                Faculty Workspace
              </p>

              <h1 className="mt-1 break-words text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                Tests & Examinations
              </h1>

              <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                Schedule and manage academic tests for students.
              </p>
            </div>
          </div>

          <button
            onClick={openForm}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-3 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:-translate-y-0.5 hover:shadow-xl md:w-auto"
          >
            <Plus size={18} />
            Schedule Test
          </button>
        </header>

        {/* Messages */}
        {message && (
          <div className="mb-5 flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-700">
            <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
            <span>{message}</span>
          </div>
        )}

        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Stats */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <InfoCard
            icon={FileText}
            title="Total Tests"
            value={tests.length}
            iconClass="bg-blue-50 text-blue-600"
          />

          <InfoCard
            icon={CalendarDays}
            title="Upcoming Tests"
            value={upcomingTests}
            iconClass="bg-indigo-50 text-indigo-600"
          />

          <InfoCard
            icon={Clock}
            title="Database"
            value="Connected"
            valueClass="text-lg text-emerald-600"
            iconClass="bg-emerald-50 text-emerald-600"
          />
        </section>

        {/* Tests list */}
        <section className="mt-6 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6">
          <div className="flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-lg font-bold text-slate-900">
                Scheduled Tests
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Tests created by faculty are stored in Supabase.
              </p>
            </div>

            <button
              onClick={loadTests}
              disabled={loading}
              title="Refresh tests"
              className="flex h-10 w-10 shrink-0 items-center justify-center self-end rounded-xl border border-slate-200 bg-white text-slate-600 transition hover:bg-slate-50 disabled:opacity-50 sm:self-auto"
            >
              <RefreshCw
                size={17}
                className={loading ? "animate-spin" : ""}
              />
            </button>
          </div>

          <div className="pt-5">
            {loading ? (
              <div className="py-14 text-center text-sm text-slate-500">
                Loading tests...
              </div>
            ) : tests.length === 0 ? (
              <EmptyState
                icon={ClipboardCheck}
                title="No tests scheduled"
                description="Schedule your first test to publish it for students."
                buttonText="Schedule Test"
                onClick={openForm}
              />
            ) : (
              <div className="grid grid-cols-1 gap-4">
                {tests.map((test) => (
                  <article
                    key={test.id}
                    className="min-w-0 rounded-xl border border-slate-200 bg-slate-50/60 p-4 transition hover:border-blue-200 hover:bg-white hover:shadow-sm sm:p-5"
                  >
                    <div className="grid grid-cols-1 gap-5 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-center">
                      {/* Main */}
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="min-w-0 break-words text-base font-bold text-slate-900 sm:text-lg">
                            {test.title}
                          </h3>

                          <span className="shrink-0 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-bold text-blue-600">
                            {test.status}
                          </span>
                        </div>

                        <p className="mt-1 break-words text-sm font-semibold text-slate-500">
                          {test.subject}
                        </p>
                      </div>

                      {/* Details */}
                      <div className="grid grid-cols-1 gap-3 sm:grid-cols-3 lg:w-[520px]">
                        <div className="min-w-0 rounded-xl bg-white p-3.5 shadow-sm">
                          <p className="text-xs font-medium text-slate-400">
                            Date & Time
                          </p>

                          <p className="mt-1 break-words text-sm font-bold text-slate-700">
                            {formatDate(test.test_date)}
                          </p>
                        </div>

                        <div className="rounded-xl bg-white p-3.5 shadow-sm">
                          <p className="text-xs font-medium text-slate-400">
                            Duration
                          </p>

                          <p className="mt-1 text-sm font-bold text-slate-700">
                            {test.duration} min
                          </p>
                        </div>

                        <div className="rounded-xl bg-white p-3.5 shadow-sm">
                          <p className="text-xs font-medium text-slate-400">
                            Total Marks
                          </p>

                          <p className="mt-1 text-sm font-bold text-slate-700">
                            {test.total_marks}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </div>
        </section>

        <div className="h-10" />
      </main>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-slate-900/50 px-4 py-6 backdrop-blur-sm">
          <div className="my-auto max-h-[92vh] w-full max-w-xl overflow-y-auto rounded-2xl border border-white/80 bg-white shadow-2xl">
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-slate-200 bg-white px-5 py-4 sm:px-6">
              <div className="min-w-0">
                <h2 className="text-xl font-bold text-slate-900">
                  Schedule New Test
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Publish a test for students.
                </p>
              </div>

              <button
                type="button"
                onClick={closeForm}
                disabled={saving}
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500 transition hover:bg-slate-200 disabled:opacity-50"
              >
                <X size={18} />
              </button>
            </div>

            <form
              onSubmit={handleCreateTest}
              className="space-y-5 p-5 sm:p-6"
            >
              <FormField label="Test Title">
                <input
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Example: Deep Learning Unit Test - II"
                  required
                  className={inputClass}
                />
              </FormField>

              <FormField label="Subject">
                <input
                  name="subject"
                  value={form.subject}
                  onChange={handleChange}
                  placeholder="Example: Deep Learning"
                  required
                  className={inputClass}
                />
              </FormField>

              <FormField label="Test Date & Time">
                <input
                  type="datetime-local"
                  name="test_date"
                  value={form.test_date}
                  onChange={handleChange}
                  required
                  className={inputClass}
                />
              </FormField>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <FormField label="Duration (minutes)">
                  <input
                    type="number"
                    name="duration"
                    min="1"
                    value={form.duration}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </FormField>

                <FormField label="Total Marks">
                  <input
                    type="number"
                    name="total_marks"
                    min="1"
                    value={form.total_marks}
                    onChange={handleChange}
                    required
                    className={inputClass}
                  />
                </FormField>
              </div>

              <button
                type="submit"
                disabled={saving}
                className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-blue-500/20 transition hover:from-blue-700 hover:to-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {saving ? "Publishing Test..." : "Publish Test"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

function InfoCard({
  icon: Icon,
  title,
  value,
  iconClass,
  valueClass = "text-2xl text-slate-900",
}) {
  return (
    <div className="min-w-0 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div
          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${iconClass}`}
        >
          <Icon size={21} />
        </div>

        <div className="min-w-0">
          <p className="truncate text-sm text-slate-500">{title}</p>

          <p className={`mt-1 font-extrabold ${valueClass}`}>
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}

function EmptyState({
  icon: Icon,
  title,
  description,
  buttonText,
  onClick,
}) {
  return (
    <div className="rounded-xl border border-dashed border-slate-300 bg-slate-50 px-5 py-12 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-white text-slate-400 shadow-sm">
        <Icon size={24} />
      </div>

      <h3 className="mt-4 font-bold text-slate-800">{title}</h3>

      <p className="mx-auto mt-1 max-w-md text-sm leading-6 text-slate-500">
        {description}
      </p>

      <button
        onClick={onClick}
        className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-bold text-white transition hover:bg-blue-700"
      >
        <Plus size={17} />
        {buttonText}
      </button>
    </div>
  );
}

function FormField({ label, children }) {
  return (
    <div>
      <label className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </label>

      {children}
    </div>
  );
}

const inputClass =
  "w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-100";