import {
  BookOpen,
  GraduationCap,
  Layers,
  CalendarDays,
} from "lucide-react";

const departments = [
  {
    name: "Computer Science & Engineering",
    code: "CSE",
    students: 1200,
    subjects: 48,
  },
  {
    name: "Artificial Intelligence",
    code: "AI",
    students: 200,
    subjects: 48,
  },
  {
    name: "Artificial Intelligence & Data Science",
    code: "AIDS",
    students: 200,
    subjects: 48,
  },
  {
    name: "Artificial Intelligence & Machine Learning",
    code: "AIML",
    students: 200,
    subjects: 48,
  },
  {
    name: "Electronics & Communication Engineering",
    code: "ECE",
    students: 600,
    subjects: 46,
  },
  {
    name: "Electrical & Electronics Engineering",
    code: "EEE",
    students: 250,
    subjects: 44,
  },
  {
    name: "Mechanical Engineering",
    code: "MECH",
    students: 200,
    subjects: 45,
  },
  {
    name: "Civil Engineering",
    code: "CIVIL",
    students: 200,
    subjects: 45,
  },
];

function AdminAcademics() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-sm font-medium text-blue-600">Administration</p>
          <h1 className="mt-1 text-3xl font-bold text-slate-900">
            Academics
          </h1>
          <p className="mt-2 text-slate-500">
            Manage departments, subjects and academic structure.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ["Departments", "8", GraduationCap],
            ["Subjects", "184", BookOpen],
            ["Active Semesters", "8", Layers],
            ["Academic Year", "2026–27", CalendarDays],
          ].map(([title, value, Icon]) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-center justify-between">
                <p className="text-sm text-slate-500">{title}</p>
                <Icon size={20} className="text-blue-600" />
              </div>

              <p className="mt-4 text-2xl font-bold text-slate-900">
                {value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-xl font-bold text-slate-900">
            Departments
          </h2>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            {departments.map((department) => (
              <div
                key={department.code}
                className="rounded-2xl border border-slate-200 p-5"
              >
                <div className="flex items-start justify-between">
                  <div>
                    <span className="rounded-lg bg-blue-50 px-3 py-1 text-xs font-bold text-blue-600">
                      {department.code}
                    </span>

                    <h3 className="mt-3 font-bold text-slate-900">
                      {department.name}
                    </h3>
                  </div>
                </div>

                <div className="mt-5 flex gap-8 text-sm">
                  <div>
                    <p className="text-slate-500">Students</p>
                    <p className="mt-1 font-bold text-slate-900">
                      {department.students}
                    </p>
                  </div>

                  <div>
                    <p className="text-slate-500">Subjects</p>
                    <p className="mt-1 font-bold text-slate-900">
                      {department.subjects}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminAcademics;