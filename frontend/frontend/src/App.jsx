import { useEffect, useState } from "react";
import "./App.css";
import Dashboard from "./Dashboard.jsx";
import Login from "./pages/Login.jsx";
import Signup from "./pages/Register.jsx";

export default function App() {
  const [currentPage, setCurrentPage] = useState(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // 🔐 Check login status once when app loads
  useEffect(() => {
    const token = localStorage.getItem("token");
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setCurrentPage(token ? "dashboard" : "login");
    setCheckingAuth(false);
  }, []);

  // 🚪 Logout handler
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentPage("login");
  };

  // ⏳ Prevent UI flicker
  if (checkingAuth) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "18px",
        }}
      >
        Loading...
      </div>
    );
  }

  return (
    <>
      {currentPage === "login" && (
        <Login
          onLoginSuccess={() => setCurrentPage("dashboard")}
          onNavigate={setCurrentPage}
        />
      )}

      {currentPage === "signup" && (
        <Signup
          onSignupSuccess={() => setCurrentPage("dashboard")}
          onNavigate={setCurrentPage}
        />
      )}

      {currentPage === "dashboard" && (
        <Dashboard onLogout={handleLogout} />
      )}
    </>
  );
}
