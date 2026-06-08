// src/app/App.tsx
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { LandingPage } from "./components/LandingPage";
import { LoginPage } from "./components/LoginPage";
import { Dashboard } from "./components/Dashboard";
import { AdminWaitingListPage } from "./components/AdminWaitingListPage";

export default function App() {
  return (
    <Routes>
      {/* Landing */}
      <Route path="/" element={<LandingWrapper />} />

      {/* Login */}
      <Route path="/login" element={<LoginWrapper mode="login" />} />

      {/* Register */}
      <Route path="/register" element={<LoginWrapper mode="register" />} />

      {/* Dashboard */}
      <Route path="/dashboard" element={<DashboardWrapper />} />

      {/* Admin - lista de espera */}
      <Route path="/admin/waiting-list" element={<AdminWaitingListPage />} />

      {/* Qualquer outra rota → landing */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

/**
 * Wrappers para adaptar seu onNavigate baseado em string de página
 * para navegação por URL com useNavigate.
 */

function LandingWrapper() {
  const navigate = useNavigate();

  return (
    <LandingPage
      onNavigate={(p) => {
        if (p === "register") navigate("/register");
        else navigate("/login");
      }}
    />
  );
}

function LoginWrapper({ mode }: { mode: "login" | "register" }) {
  const navigate = useNavigate();

  return (
    <LoginPage
      mode={mode}
      onNavigate={(p) => {
        if (p === "landing") navigate("/");
        else if (p === "dashboard") navigate("/dashboard");
        else if (p === "register") navigate("/register");
        else navigate("/login");
      }}
    />
  );
}

function DashboardWrapper() {
  const navigate = useNavigate();

  return (
    <Dashboard
      onNavigate={(p) => {
        if (p === "landing") navigate("/");
        else if (p === "login") navigate("/login");
        else if (p === "register") navigate("/register");
        else if (p === "admin") navigate("/admin/waiting-list");
        else navigate("/dashboard");
      }}
    />
  );
}