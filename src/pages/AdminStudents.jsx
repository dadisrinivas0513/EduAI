import { Search, UserPlus, Users, MoreVertical } from "lucide-react";

const students = [
  { name: "Dadi Srinivas", roll: "23CSE001", year: "Final Year", status: "Active" },
  { name: "Rahul Kumar", roll: "23CSE002", year: "Final Year", status: "Active" },
  { name: "Priya Sharma", roll: "23CSE003", year: "Final Year", status: "Active" },
  { name: "Arjun Reddy", roll: "23CSE004", year: "Final Year", status: "Inactive" },
];

function AdminStudents() {
  return (
    <div className="min-h-screen bg-slate-50 p-6 md:p-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-600">Administration</p>
            <h1 className="mt-1 text-3xl font-bold text-slate-900">
              Students
            </h1>
            <p className="mt-2 text-slate-500">
              Manage registered students and academic information.
            </p>
          </div>

          <button className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700">
            <UserPlus size={18} />
            Add Student
          </button>
        </div>

        <div className="mb-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <Users className="text-blue-600" />
            <p className="mt-4 text-sm text-slate-500">Total Students</p>
            <p className="mt-1 text-2xl font-bold text-slate-900">1,248</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Active Students</p>
            <p className="mt-1 text-2xl font-bold text-emerald-600">1,201</p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-sm text-slate-500">Final Year</p>
            <p className="mt-1 text-2xl font-bold text-indigo-600">312</p>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
          <div className="border-b border-slate-200 p-5">
            <div className="flex items-center gap-3 rounded-xl border border-slate-200 px-4 py-3">
              <Search size={19} className="text-slate-400" />
              <input
                type="text"
                placeholder="Search students..."
                className="w-full outline-none text-sm"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px] text-left">
              <thead>
                <tr className="border-b border-slate-200 text-sm text-slate-500">
                  <th className="px-6 py-4 font-medium">Student</th>
                  <th className="px-6 py-4 font-medium">Roll Number</th>
                  <th className="px-6 py-4 font-medium">Year</th>
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4"></th>
                </tr>
              </thead>

              <tbody>
                {students.map((student) => (
                  <tr
                    key={student.roll}
                    className="border-b border-slate-100 last:border-0"
                  >
                    <td className="px-6 py-5 font-semibold text-slate-800">
                      {student.name}
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-500">
                      {student.roll}
                    </td>

                    <td className="px-6 py-5 text-sm text-slate-500">
                      {student.year}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`rounded-full px-3 py-1 text-xs font-semibold ${
                          student.status === "Active"
                            ? "bg-emerald-50 text-emerald-600"
                            : "bg-slate-100 text-slate-500"
                        }`}
                      >
                        {student.status}
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

export default AdminStudents;