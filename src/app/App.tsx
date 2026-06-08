
import { useState } from "react";
import { LandingPage } from "./components/LandingPage";
import { LoginPage } from "./components/LoginPage";
import { Dashboard } from "./components/Dashboard";

type Page = "landing" | "login" | "register" | "dashboard";

export default function App() {
  const [page, setPage] = useState<Page>("landing");

  const navigate = (target: Page) => {
    setPage(target);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (page === "landing") {
    return (
      <LandingPage
        onNavigate={(p) => navigate(p === "register" ? "register" : "login")}
      />
    );
  }

  if (page === "login" || page === "register") {
    return (
      <LoginPage
        mode={page === "register" ? "register" : "login"}
        onNavigate={(p) => {
          if (p === "landing") navigate("landing");
          else if (p === "dashboard") navigate("dashboard");
          else navigate("register");
        }}
      />
    );
  }

  if (page === "dashboard") {
    return <Dashboard onNavigate={(p) => navigate(p)} />;
  }

  return null;
}