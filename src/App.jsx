import { BrowserRouter, Routes, Route } from "react-router-dom";

import Landing from "./pages/Landing";
import Login from "./pages/Login";

import StudentDashboard from "./pages/StudentDashboard";
import Subjects from "./pages/Subjects";
import Assignments from "./pages/Assignments";
import Tests from "./pages/Tests";
import DailyChallenge from "./pages/DailyChallenge";
import Analytics from "./pages/Analytics";
import AdminStudents from "./pages/AdminStudents";
import AdminFaculty from "./pages/AdminFaculty";
import AdminAcademics from "./pages/AdminAcademics";
import AdminReports from "./pages/AdminReports";

import FacultyDashboard from "./pages/FacultyDashboard";
import FacultyTests from "./pages/FacultyTests";
import FacultyAssignments from "./pages/FacultyAssignments";
import FacultyAnalytics from "./pages/FacultyAnalytics";

import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />

        {/* Student */}
        <Route path="/student" element={<StudentDashboard />} />
        <Route path="/student/subjects" element={<Subjects />} />
        <Route path="/student/assignments" element={<Assignments />} />
        <Route path="/student/tests" element={<Tests />} />
        <Route
          path="/student/challenge"
          element={<DailyChallenge />}
        />
        <Route path="/student/analytics" element={<Analytics />} />

        {/* Faculty */}
        <Route path="/faculty" element={<FacultyDashboard />} />
        <Route path="/faculty/tests" element={<FacultyTests />} />
        <Route
          path="/faculty/assignments"
          element={<FacultyAssignments />}
        />
        <Route
          path="/faculty/analytics"
          element={<FacultyAnalytics />}
        />

        {/* Admin */}
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/students" element={<AdminStudents />} />
        <Route path="/admin/faculty" element={<AdminFaculty />} />
        <Route path="/admin/academics" element={<AdminAcademics />} />
        <Route path="/admin/reports" element={<AdminReports />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;