import { Routes, Route } from "react-router-dom";

import LoginPage from "../pages/auth/LoginPage";
import DashboardPage from "../pages/dashboard/DashboardPage";
import UploadPage from "../pages/upload/UploadPage";
import ReportBuilderPage from "../pages/reports/ReportBuilderPage";
import TemplatesPage from "../pages/templates/TemplatesPage";
import AnalyticsPage from "../pages/analytics/AnalyticsPage";
import UsersPage from "../pages/users/UsersPage";

import AdminRoute from "../components/AdminRoute";

export default function AppRoutes() {

  return (

    <Routes>

      <Route
        path="/"
        element={<LoginPage />}
      />

      <Route
        path="/dashboard"
        element={<DashboardPage />}
      />

      <Route
        path="/upload"
        element={<UploadPage />}
      />

      <Route
        path="/reports"
        element={<ReportBuilderPage />}
      />

      <Route
        path="/templates"
        element={<TemplatesPage />}
      />

      <Route
        path="/analytics"
        element={<AnalyticsPage />}
      />

      <Route
        path="/users"
        element={
          <AdminRoute>
            <UsersPage />
          </AdminRoute>
        }
      />

    </Routes>

  );

}