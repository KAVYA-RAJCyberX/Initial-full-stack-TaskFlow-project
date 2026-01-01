import React from 'react';

export default function StatsCard({ icon, label, count, type }) {
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
