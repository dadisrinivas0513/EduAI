import {
  TrendingUp,
  Award,
  CheckCircle2,
  Target,
} from "lucide-react";

const subjects = [
  { name: "Distributed Systems", score: 84 },
  { name: "Internet of Things", score: 78 },
  { name: "Deep Learning", score: 91 },
  { name: "Cyber Security & Digital Forensics", score: 72 },
  { name: "Software Project Management", score: 86 },
  { name: "Organisational Behavior", score: 86 },
  { name: "Digital Thinking & Product Innovation", score: 88 },
];

function Analytics() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-blue-600">
            Performance Tracking
          </p>
          <h1 className="text-3xl font-bold text-slate-900">
            My Analytics
          </h1>
          <p className="mt-2 text-slate-500">
            Understand your academic progress and learning performance.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {[
            ["Average Score", "82%", TrendingUp],
            ["Assignments", "18/22", CheckCircle2],
            ["Attendance", "91%", Target],
            ["EduAI Credits", "245", Award],
          ].map(([title, value, Icon]) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm text-slate-500">{title}</span>
                <div className="rounded-xl bg-blue-50 p-2 text-blue-600">
                  <Icon size={20} />
                </div>
              </div>

              <p className="text-2xl font-bold text-slate-900">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Subject Performance
          </h2>

          <div className="mt-6 space-y-5">
            {subjects.map((subject) => (
              <div key={subject.name}>
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium text-slate-700">
                    {subject.name}
                  </span>

                  <span className="font-bold text-blue-600">
                    {subject.score}%
                  </span>
                </div>

                <div className="h-3 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{ width: `${subject.score}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-bold text-slate-900">Strong Areas</h2>

            <div className="mt-4 space-y-3">
              {["Deep Learning", "Artificial Intelligence"].map(
                (item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-xl bg-emerald-50 p-3 text-sm font-medium text-emerald-700"
                  >
                    <CheckCircle2 size={18} />
                    {item}
                  </div>
                )
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-bold text-slate-900">
              Recommended Focus
            </h2>

            <div className="mt-4 space-y-3">
              {["Operating Systems", "DBMS"].map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-3 rounded-xl bg-amber-50 p-3 text-sm font-medium text-amber-700"
                >
                  <Target size={18} />
                  Spend more study time on {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Analytics;