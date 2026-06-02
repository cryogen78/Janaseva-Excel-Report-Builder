import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Upload,
  FileSpreadsheet,
  LayoutTemplate,
  BarChart3,
  Download,
  HardDrive,
  Activity,
  Building2,
  LogOut,
  Clock
} from "lucide-react";

export default function DashboardPage() {

  const navigate = useNavigate();

  const role =
    localStorage.getItem("role");

  const [stats] = useState({
    totalReports: 120,
    totalUploads: 25,
    totalUsers: 18,
    totalTemplates: 12
  });

  const [recentReports] = useState([
    {
      id: 1,
      name: "Monthly Deposit Report",
      user: "Admin",
      date: "30-May-2026"
    },
    {
      id: 2,
      name: "Loan Portfolio Report",
      user: "Admin",
      date: "29-May-2026"
    },
    {
      id: 3,
      name: "Branch Performance Report",
      user: "Manager",
      date: "28-May-2026"
    },
    {
      id: 4,
      name: "Audit Transaction Report",
      user: "Auditor",
      date: "27-May-2026"
    }
  ]);

  const [recentUploads] = useState([
    {
      id: 1,
      file_name: "Deposits.xlsx",
      uploaded_by: "Admin",
      rows_count: 2500
    },
    {
      id: 2,
      file_name: "Loans.xlsx",
      uploaded_by: "Manager",
      rows_count: 1800
    },
    {
      id: 3,
      file_name: "Salary.xlsx",
      uploaded_by: "Admin",
      rows_count: 750
    }
  ]);

  const [activityLogs] = useState([
    {
      id: 1,
      username: "Admin",
      action: "Uploaded Deposits.xlsx"
    },
    {
      id: 2,
      username: "Manager",
      action: "Generated Monthly Loan Report"
    },
    {
      id: 3,
      username: "Auditor",
      action: "Downloaded Audit Report"
    }
  ]);

  const [scheduledReports] = useState([
    {
      id: 1,
      name: "Daily Cash Report",
      nextRun: "Tomorrow 09:00 AM"
    },
    {
      id: 2,
      name: "Weekly Loan Report",
      nextRun: "Sunday 06:00 PM"
    },
    {
      id: 3,
      name: "Monthly Audit Report",
      nextRun: "01-Jun-2026"
    }
  ]);

  const [templates] = useState([
    "Salary Report Template",
    "Audit Report Template",
    "Branch Performance Template",
    "Loan Portfolio Template"
  ]);

  const logout = () => {

    localStorage.removeItem("token");
    navigate("/");

  };

  return (

    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}

      <div className="w-72 bg-orange-600 text-white flex flex-col">

        <div className="p-6 border-b border-orange-500">

          <Building2 size={42} />

          <h1 className="text-2xl font-bold mt-4">
            Janaseva Sahakari Bank
          </h1>

          <p className="text-sm opacity-80 mt-2">
            Enterprise Reporting Platform
          </p>

        </div>

        <div className="flex-1 p-4 space-y-3">

          <button
            onClick={() => navigate("/upload")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-orange-500 transition"
          >
            <Upload size={20} />
            Upload Excel
          </button>

          <button
            onClick={() => navigate("/reports")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-orange-500 transition"
          >
            <FileSpreadsheet size={20} />
            Report Builder
          </button>

          <button
            onClick={() => navigate("/templates")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-orange-500 transition"
          >
            <LayoutTemplate size={20} />
            Templates
          </button>

          <button
            onClick={() => navigate("/analytics")}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-orange-500 transition"
          >
          {
  role === "admin" && (

    <button
      onClick={() => navigate("/users")}
      className="
        w-full
        flex
        items-center
        gap-3
        px-4
        py-3
        rounded-xl
        hover:bg-orange-500
        transition
      "
    >
      User Management
    </button>

  )
}
            <BarChart3 size={20} />
            Analytics
          </button>

        </div>

        <div className="p-4 border-t border-orange-500">

          <button
            onClick={logout}
            className="w-full bg-white text-orange-600 py-3 rounded-xl flex items-center justify-center gap-2 font-semibold"
          >
            <LogOut size={18} />
            Logout
          </button>

        </div>

      </div>

      {/* MAIN CONTENT */}

      <div className="flex-1 p-8 overflow-auto">

        <h1 className="text-4xl font-bold text-orange-600 mb-8">
          Banking Reporting Command Center
        </h1>

        {/* KPI CARDS */}

        <div className="grid grid-cols-4 gap-6">

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500">Uploaded Files</p>
            <h2 className="text-4xl font-bold text-orange-600 mt-3">
              {stats.totalUploads}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500">Reports Generated</p>
            <h2 className="text-4xl font-bold text-orange-600 mt-3">
              {stats.totalReports}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500">Templates Saved</p>
            <h2 className="text-4xl font-bold text-orange-600 mt-3">
              {stats.totalTemplates}
            </h2>
          </div>

          <div className="bg-white rounded-2xl shadow p-6">
            <p className="text-gray-500">Active Users</p>
            <h2 className="text-4xl font-bold text-orange-600 mt-3">
              {stats.totalUsers}
            </h2>
          </div>

        </div>

        {/* QUICK ACTIONS */}

        <div className="mt-10">

          <h2 className="text-2xl font-bold mb-5">
            Quick Actions
          </h2>

          <div className="grid grid-cols-3 gap-6">

            <div
              onClick={() => navigate("/upload")}
              className="bg-white p-6 rounded-2xl shadow cursor-pointer hover:shadow-lg"
            >
              <Upload size={42} className="text-orange-600" />
              <h3 className="text-xl font-semibold mt-4">
                Upload Excel
              </h3>
            </div>

            <div
              onClick={() => navigate("/reports")}
              className="bg-white p-6 rounded-2xl shadow cursor-pointer hover:shadow-lg"
            >
              <FileSpreadsheet size={42} className="text-orange-600" />
              <h3 className="text-xl font-semibold mt-4">
                Create Report
              </h3>
            </div>

            <div
              onClick={() => navigate("/analytics")}
              className="bg-white p-6 rounded-2xl shadow cursor-pointer hover:shadow-lg"
            >
              <BarChart3 size={42} className="text-orange-600" />
              <h3 className="text-xl font-semibold mt-4">
                View Analytics
              </h3>
            </div>

          </div>

        </div>

        {/* RECENT REPORTS */}

        <div className="mt-10 bg-white rounded-2xl shadow">

          <div className="p-6 border-b">
            <h2 className="text-2xl font-bold">
              Recent Reports
            </h2>
          </div>

          <table className="w-full">

            <thead>

              <tr className="bg-gray-100">

                <th className="p-4 text-left">Report Name</th>
                <th className="p-4 text-left">Generated By</th>
                <th className="p-4 text-left">Date</th>
                <th className="p-4 text-left">Action</th>

              </tr>

            </thead>

            <tbody>

              {recentReports.map((report) => (

                <tr key={report.id} className="border-b">

                  <td className="p-4">{report.name}</td>
                  <td className="p-4">{report.user}</td>
                  <td className="p-4">{report.date}</td>

                  <td className="p-4">

                    <button className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center gap-2">
                      <Download size={16} />
                      Download
                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

        {/* RECENT UPLOADS + TEMPLATES */}

        <div className="grid grid-cols-2 gap-6 mt-10">

          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="text-xl font-bold mb-4">
              Recent Uploads
            </h2>

            {recentUploads.map((file) => (

              <div key={file.id} className="border-b py-3">

                <p className="font-semibold">
                  {file.file_name}
                </p>

                <p className="text-sm text-gray-500">
                  {file.uploaded_by} • {file.rows_count} rows
                </p>

              </div>

            ))}

          </div>

          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="text-xl font-bold mb-4">
              Most Used Templates
            </h2>

            {templates.map((template, index) => (

              <div key={index} className="border-b py-3">
                {template}
              </div>

            ))}

          </div>

        </div>

        {/* SCHEDULED REPORTS + STORAGE */}

        <div className="grid grid-cols-2 gap-6 mt-10">

          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-2 mb-4">

              <Clock />

              <h2 className="text-xl font-bold">
                Scheduled Reports
              </h2>

            </div>

            {scheduledReports.map((report) => (

              <div key={report.id} className="border-b py-3">

                <p className="font-semibold">
                  {report.name}
                </p>

                <p className="text-sm text-gray-500">
                  Next Run: {report.nextRun}
                </p>

              </div>

            ))}

          </div>

          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-2 mb-4">

              <HardDrive />

              <h2 className="text-xl font-bold">
                Storage Usage
              </h2>

            </div>

            <p>Excel Files</p>

            <div className="w-full bg-gray-200 rounded-full h-4 mb-4">

              <div
                className="bg-orange-500 h-4 rounded-full"
                style={{ width: "45%" }}
              />

            </div>

            <p>Generated Reports</p>

            <div className="w-full bg-gray-200 rounded-full h-4">

              <div
                className="bg-orange-500 h-4 rounded-full"
                style={{ width: "65%" }}
              />

            </div>

          </div>

        </div>

        {/* ACTIVITY + BRANCH SUMMARY */}

        <div className="grid grid-cols-2 gap-6 mt-10">

          <div className="bg-white rounded-2xl shadow p-6">

            <div className="flex items-center gap-2 mb-4">

              <Activity />

              <h2 className="text-xl font-bold">
                User Activity Feed
              </h2>

            </div>

            {activityLogs.map((log) => (

              <div key={log.id} className="border-b py-3">

                <p className="font-semibold">
                  {log.username}
                </p>

                <p className="text-sm text-gray-500">
                  {log.action}
                </p>

              </div>

            ))}

          </div>

          <div className="bg-white rounded-2xl shadow p-6">

            <h2 className="text-xl font-bold mb-4">
              Branch-wise Activity Summary
            </h2>

            <table className="w-full">

              <thead>

                <tr>

                  <th className="text-left">Branch</th>
                  <th>Uploads</th>
                  <th>Reports</th>

                </tr>

              </thead>

              <tbody>

                <tr>
                  <td>Borivali</td>
                  <td>22</td>
                  <td>67</td>
                </tr>

                <tr>
                  <td>Kandivali</td>
                  <td>18</td>
                  <td>52</td>
                </tr>

                <tr>
                  <td>Malad</td>
                  <td>13</td>
                  <td>34</td>
                </tr>

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </div>

  );

}