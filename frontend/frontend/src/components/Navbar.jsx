
export function StatsCard({ icon, label, count, type }) {
return (
    <div className="stats-card">
        <div className={`stats-icon ${type}`}>{icon}</div>
        <div className="stats-info">
            <h3>{label}</h3>
            <h2>{count}</h2>
        </div>
    </div>
    );
}
export default function Navbar({ user, onLogout }) {
return (
    <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "12px 24px",
        background: "#111",
        color: "#fff"
    }}>
        <h3>Task Flow</h3>

        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
        <span>👋 {user?.name}</span>

        <button
            onClick={onLogout}
            style={{
            background: "#e63946",
            border: "none",
            color: "#fff",
            padding: "6px 12px",
            borderRadius: "4px",
            cursor: "pointer"
            }}
        >
            Logout
        </button>
        </div>
    </nav>
);
}

