import { UserPlus, Users, BookOpen, MoreVertical } from "lucide-react";

const faculty = [
  
  {
    name: "Sravani",
    department: "CSE",
    subjects: "Software Project Management",
    status: "Active",
  },
  {
    name: "S Gayatri",
    department: "CSE",
    subjects: "Cyber Security & Digital Forensics",
    status: "Active",
  },
  {
    name: "S Rama Kumar",
    department: "CSE",
    subjects: "Distributed Systems",
    status: "Active",
  },
  {
    name: "K Pavani",
    department: "CSE",
    subjects: "Deep Learning",
    status: "Active",
  },
  {
    name: "B Anusha",
    department: "CSE",
    subjects: "Internet of Things",
    status: "Active",
  },
  {
    name: "Revathi",
    department: "CSE",
    subjects: "Organisational Behavior",
    status: "Active",
  },
  {
    name: "B Anusha",
    department: "CSE",
    subjects: "Digital Thinking & Product Innovation",
    status: "Active",
  },
];

function AdminFaculty() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-600">Administration</p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              Faculty
            </h1>
            <p className="mt-2 text-slate-500">
              Manage faculty members and subject assignments.
            </p>
          </div>

          <button className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700">
            <UserPlus size={18} />
            Add Faculty
          </button>
        </div>

        <div className="mb-6 grid gap-5 sm:grid-cols-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <Users className="text-blue-600" />
            <p className="mt-4 text-sm text-slate-500">Total Faculty</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">86</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <BookOpen className="text-indigo-600" />
            <p className="mt-4 text-sm text-slate-500">Active Subjects</p>
            <p className="mt-1 text-2xl font-bold text-indigo-600">48</p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left">
              <thead>
                <tr className="border-b border-slate-200 text-sm text-slate-500">
                  <th className="px-6 py-4 font-medium">Faculty</th>
                  <th className="px-6 py-4 font-medium">Department</th>
                  <th className="px-6 py-4 font-medium">Subject</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>

              <tbody>
                {faculty.map((member) => (
                  <tr
                    key={member.name}
                    className="border-b border-slate-100 last:border-0"
                  >
                    <td className="px-6 py-5 font-semibold text-slate-800">
                      {member.name}
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-500">
                      {member.department}
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-500">
                      {member.subjects}
                    </td>

                    <td className="px-6 py-5">
                      <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-600">
                        {member.status}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <button className="rounded-lg p-2 text-slate-400 hover:bg-slate-100">
                        <MoreVertical size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminFaculty;