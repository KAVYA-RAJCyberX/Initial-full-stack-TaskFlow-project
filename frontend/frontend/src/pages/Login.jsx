import { useState } from "react";
import { authAPI } from "../api";

export default function Login({ onLoginSuccess, onNavigate }) {
    const [email, setEmail] = useState("chouhankavyaraj721@email.com");
    const [password, setPassword] = useState("password123");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
        const response = await authAPI.login(email, password);

        if (response.success) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("user", JSON.stringify(response.user));
        onLoginSuccess();
        } else {
        setError(response.message || "Login failed");
        }
    } catch (err) {
        setError(err.message || "Invalid email or password");
        console.error("Login error:", err);
    } finally {
        setLoading(false);
    }
    };

    return (
    <div className="auth-container">
        <div className="auth-card">
            <div className="auth-icon">✓</div>
            <h1>TaskFlow</h1>
            <p>Manage your tasks efficiently</p>

        {error && (
            <div
            style={{
                color: "#ef4444",
                marginBottom: "16px",
                fontSize: "14px",
                padding: "10px",
                backgroundColor: "rgba(239, 68, 68, 0.1)",
                borderRadius: "4px",
            }}
            >
            {error}
            </div>
        )}

        <form onSubmit={handleLogin}>
            <div className="form-group">
            <label className="form-label">Email</label>
            <input
                type="email"
                className="form-input"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                disabled={loading}
            />
            </div>

            <div className="form-group">
            <label className="form-label">Password</label>
            <input
                type="password"
                className="form-input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                disabled={loading}
            />
            </div>

            <button
            type="submit"
            className="btn btn-primary btn-submit"
            disabled={loading}
            >
            {loading ? "⏳ Signing in..." : "➜ Sign In"}
            </button>
        </form>

        <div className="auth-footer">
            Don't have an account?{" "}
            <a onClick={() => onNavigate("signup")}>Sign up</a>
        </div>
    </div>
    </div>
    );
}
