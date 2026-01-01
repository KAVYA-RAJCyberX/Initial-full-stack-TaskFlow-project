import { useState } from "react";
import { authAPI } from "../api";

export default function Signup({ onSignupSuccess, onNavigate }) {
    const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    });
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
        ...prev,
        [name]: value,
    }));
};

    const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (formData.password !== formData.confirmPassword) {
        setError("Passwords do not match!");
        setLoading(false);
        return;
    }

    try {
        const response = await authAPI.signup(
        formData.name,
        formData.email,
        formData.password
        );

    if (response.success) {
        localStorage.setItem('token', response.token);
        localStorage.setItem('user', JSON.stringify(response.user));
        onSignupSuccess();
    } else {
        setError(response.message || 'Signup failed');
    }
    } catch (err) {
        setError(err.message || 'Failed to create account');
        console.error('Signup error:', err);
    } finally {
        setLoading(false);
    }
};

return (
    <div className="auth-container">
        <div className="auth-card">
        <div className="auth-icon">✓</div>
        <h1>TaskFlow</h1>
        <p>Create your account</p>

        {error && (
            <div style={{
            color: "#ef4444",
            marginBottom: "16px",
            fontSize: "14px",
            padding: "10px",
            backgroundColor: "rgba(239, 68, 68, 0.1)",
            borderRadius: "4px"
            }}>
            {error}
            </div>
        )}

        <form onSubmit={handleSignup}>
            <div className="form-group">
            <label className="form-label">Full Name</label>
            <input
                type="text"
                name="name"
                className="form-input"
                placeholder="John Doe"
                value={formData.name}
                onChange={handleChange}
                required
                disabled={loading}
            />
            </div>

            <div className="form-group">
            <label className="form-label">Email</label>
            <input
                type="email"
                name="email"
                className="form-input"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                required
                disabled={loading}
            />
            </div>

            <div className="form-group">
            <label className="form-label">Password</label>
            <input
                type="password"
                name="password"
                className="form-input"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                required
                disabled={loading}
            />
            </div>

            <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input
                type="password"
                name="confirmPassword"
                className="form-input"
                placeholder="••••••••"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                disabled={loading}
            />
            </div>

        <button
            type="submit"
            className="btn btn-primary btn-submit"
            disabled={loading}
        >
            {loading ? "⏳ Creating..." : "👤 Create Account"}
        </button>
        </form>

        <div className="auth-footer">
            Already have an account?{" "}
            <a onClick={() => onNavigate("login")}>Sign in</a>
        </div>
    </div>
    </div>
    );
}
