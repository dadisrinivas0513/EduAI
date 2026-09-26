import { BookOpen, Clock, Users, ArrowRight } from "lucide-react";

const subjects = [
  {
    name: "Distributed Systems",
    code: "CSE301",
    faculty: "S Rama Kumar",
    progress: 78,
    lessons: 24,
    color: "blue",
  },
  {
    name: "Software Project Management",
    code: "CSE302",
    faculty: "Prof. Anitha Rao",
    progress: 65,
    lessons: 20,
    color: "indigo",
  },
  {
    name: "Deep Learning",
    code: "CSE303",
    faculty: "K Pavani",
    progress: 82,
    lessons: 28,
    color: "emerald",
  },
  {
    name: "Organizational Behavior",
    code: "CSE304",
    faculty: "Revathi",
    progress: 59,
    lessons: 18,
    color: "orange",
  },
  {
    name: "Internet of Things",
    code: "CSE305",
    faculty: "B Anusha",
    progress: 71,
    lessons: 22,
    color: "purple",
  },
  {
    name: "Cyber Security & Digital Forensics",
    code: "CSE306",
    faculty: "P Gayatri",
    progress: 88,
    lessons: 25,
    color: "pink",
  },
];

function Subjects() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8">
          <p className="mb-2 text-sm font-medium text-blue-600">
            Academic Learning
          </p>
          <h1 className="text-3xl font-bold text-slate-900">My Subjects</h1>
          <p className="mt-2 text-slate-500">
            Track your learning progress across all subjects.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {subjects.map((subject) => (
            <div
              key={subject.code}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-5 flex items-start justify-between">
                <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
                  <BookOpen size={24} />
                </div>

                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  {subject.code}
                </span>
              </div>

              <h2 className="text-lg font-bold text-slate-900">
                {subject.name}
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                {subject.faculty}
              </p>

              <div className="mt-5 flex items-center justify-between text-sm text-slate-500">
                <span className="flex items-center gap-2">
                  <Clock size={16} />
                  {subject.lessons} Lessons
                </span>

                <span className="flex items-center gap-2">
                  <Users size={16} />
                  Active
                </span>
              </div>

              <div className="mt-5">
                <div className="mb-2 flex justify-between text-sm">
                  <span className="font-medium text-slate-600">
                    Progress
                  </span>
                  <span className="font-bold text-blue-600">
                    {subject.progress}%
                  </span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className="h-full rounded-full bg-blue-600"
                    style={{ width: `${subject.progress}%` }}
                  />
                </div>
              </div>

              <button className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 py-3 text-sm font-semibold text-white transition hover:bg-blue-600">
                View Subject
                <ArrowRight size={17} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Subjects;