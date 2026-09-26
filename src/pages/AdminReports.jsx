import {
  BarChart3,
  Download,
  FileText,
  Users,
  GraduationCap,
} from "lucide-react";

const reports = [
  {
    title: "Student Performance Report",
    description: "Academic performance and marks overview",
    icon: GraduationCap,
  },
  {
    title: "Faculty Activity Report",
    description: "Tests, assignments and academic activities",
    icon: Users,
  },
  {
    title: "Platform Usage Report",
    description: "EduAI activity and engagement statistics",
    icon: BarChart3,
  },
  {
    title: "Academic Summary",
    description: "Semester-wise academic summary",
    icon: FileText,
  },
];

function AdminReports() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-sm font-medium text-blue-600">Administration</p>
          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Reports
          </h1>
          <p className="mt-2 text-slate-500">
            Generate and review academic platform reports.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {reports.map((report) => {
            const Icon = report.icon;

            return (
              <div
                key={report.title}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                    <Icon size={24} />
                  </div>

                  <button className="rounded-xl p-2 text-slate-400 hover:bg-slate-100 hover:text-blue-600">
                    <Download size={19} />
                  </button>
                </div>

                <h2 className="mt-5 font-bold text-slate-900">
                  {report.title}
                </h2>

                <p className="mt-2 text-sm text-slate-500">
                  {report.description}
                </p>

                <button className="mt-5 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-600">
                  Generate Report
                </button>
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-bold text-slate-900">
            Current Platform Summary
          </h2>

          <div className="mt-6 grid gap-5 sm:grid-cols-3">
            <div className="rounded-xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Students</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">
                1,248
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Faculty</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">
                86
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-5">
              <p className="text-sm text-slate-500">Active Subjects</p>
              <p className="mt-2 text-2xl font-bold text-slate-900">
                184
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminReports;