import {
  Users,
  UserCog,
  BookOpen,
  BarChart3,
  Activity,
  CheckCircle2,
  ArrowRight,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function AdminDashboard() {
  const navigate = useNavigate();

  const management = [
    {
      title: "Students",
      description: "Manage student accounts and academic details.",
      icon: Users,
      path: "/admin/students",
    },
    {
      title: "Faculty",
      description: "Manage faculty members and subject assignments.",
      icon: UserCog,
      path: "/admin/faculty",
    },
    {
      title: "Academics",
      description: "Manage departments, subjects and semesters.",
      icon: BookOpen,
      path: "/admin/academics",
    },
    {
      title: "Reports",
      description: "Generate academic and platform reports.",
      icon: BarChart3,
      path: "/admin/reports",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <nav className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <button
            onClick={() => navigate("/admin")}
            className="text-2xl font-bold text-blue-600"
          >
            EduAI
          </button>

          <div className="flex items-center gap-4">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-semibold text-slate-900">
                Administrator
              </p>
              <p className="text-xs text-slate-500">
                EduAI Platform
              </p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-bold text-white">
              AD
            </div>

            <button
              onClick={() => navigate("/login")}
              className="rounded-xl p-2 text-slate-500 hover:bg-red-50 hover:text-red-500"
            >
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <p className="text-sm font-medium text-blue-600">
            Administration
          </p>

          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            EduAI Platform Overview
          </h1>

          <p className="mt-2 text-slate-500">
            Manage students, faculty, academics and platform reports.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Total Students", "2500", Users],
            ["Faculty", "80", UserCog],
            ["Active Subjects", "200", BookOpen],
            ["Platform Activity", "94%", Activity],
          ].map(([title, value, Icon]) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">{title}</p>

                <div className="rounded-xl bg-blue-50 p-2 text-blue-600">
                  <Icon size={20} />
                </div>
              </div>

              <p className="mt-3 text-2xl font-bold text-slate-900">
                {value}
              </p>
            </div>
          ))}
        </div>

        {/* Management */}
        <div className="mt-8">
          <h2 className="mb-5 text-xl font-bold text-slate-900">
            Platform Management
          </h2>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
            {management.map((item) => {
              const Icon = item.icon;

              return (
                <button
                  key={item.title}
                  onClick={() => navigate(item.path)}
                  className="group rounded-2xl border border-slate-200 bg-white p-6 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
                >
                  <div className="flex items-start justify-between">
                    <div className="rounded-xl bg-blue-50 p-3 text-blue-600 transition group-hover:bg-blue-600 group-hover:text-white">
                      <Icon size={24} />
                    </div>

                    <ArrowRight
                      size={19}
                      className="text-slate-300 transition group-hover:translate-x-1 group-hover:text-blue-600"
                    />
                  </div>

                  <h3 className="mt-5 font-bold text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-500">
                    {item.description}
                  </p>
                </button>
              );
            })}
          </div>
        </div>

        {/* Departments + System */}
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-bold text-slate-900">
              Departments
            </h2>

            <div className="mt-5 space-y-3">
              {[
                ["Computer Science & Engineering", "1,200 Students"],
                ["Artificial Intelligence", "200 Students"],
                ["Artificial Intelligence & Data Science", "200 Students"],
                ["Artificial Intelligence & Machine Learning", "200 Students"],
                ["Electronics & Communication", "360 Students"],
                ["Electrical & Electronics", "240 Students"],
                ["Mechanical Engineering", "200 Students"],
                ["Civil Engineering", "200 Students"],
              ].map(([name, count]) => (
                <div
                  key={name}
                  className="flex items-center justify-between rounded-xl bg-slate-50 p-4"
                >
                  <span className="text-sm font-medium text-slate-700">
                    {name}
                  </span>

                  <span className="text-xs font-semibold text-slate-500">
                    {count}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="font-bold text-slate-900">
              System Status
            </h2>

            <div className="mt-5 space-y-4">
              {[
                "Student Management",
                "Faculty Management",
                "Academic Records",
                "Reports & Analytics",
              ].map((item) => (
                <div
                  key={item}
                  className="flex items-center justify-between"
                >
                  <span className="text-sm text-slate-600">
                    {item}
                  </span>

                  <span className="flex items-center gap-2 text-sm font-semibold text-emerald-600">
                    <CheckCircle2 size={17} />
                    Operational
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="font-bold text-slate-900">
            Recent Platform Activity
          </h2>

          <div className="mt-5 grid gap-3 md:grid-cols-2">
            {[
              "42 new student records added",
              "6 faculty profiles updated",
              "12 subjects modified",
              "Performance report generated",
            ].map((activity) => (
              <div
                key={activity}
                className="flex items-center gap-3 rounded-xl bg-slate-50 p-4"
              >
                <div className="h-2 w-2 rounded-full bg-blue-600" />
                <span className="text-sm text-slate-600">
                  {activity}
                </span>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

export default AdminDashboard;