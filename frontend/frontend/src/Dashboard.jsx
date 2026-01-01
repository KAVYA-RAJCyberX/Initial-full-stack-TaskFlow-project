import { useEffect, useState } from 'react';
import { taskAPI } from './api';
import Navbar from './components/Navbar';
import StatsCard from './components/StatsCard';
import TaskList from './components/TaskList';
import TaskModal from './components/TaskModal';

export default function Dashboard() {
    const [tasks, setTasks] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const user = JSON.parse(localStorage.getItem('user') || '{"name":"User"}');

    useEffect(() => {
    loadTasks();
    }, []);

    const loadTasks = async () => {
    try {
        setLoading(true);
        setError('');
        const response = await taskAPI.getAllTasks();
        
        if (response.success) {
        setTasks(response.tasks || []);
        } else {
        setError('Failed to load tasks');
        }
    } catch (err) {
        console.error('Error loading tasks:', err);
      // Don't show error for first load, just show empty
        setTasks([]);
    } finally {
        setLoading(false);
    }
};

const stats = {
    total: tasks.length,
    pending: tasks.filter(t => t.status === 'Pending').length,
    inProgress: tasks.filter(t => t.status === 'In Progress').length,
    completed: tasks.filter(t => t.status === 'Completed').length,
};

const handleCreateTask = async (taskData) => {
    try {
        const response = await taskAPI.createTask(taskData);
        
        if (response.success) {
        setTasks([response.task, ...tasks]);
        setShowModal(false);
        } else {
        setError('Failed to create task');
        }
    } catch (err) {
        console.error('Error creating task:', err);
        setError(err.message || 'Failed to create task');
    }
};

const handleDeleteTask = async (id) => {
    try {
        const response = await taskAPI.deleteTask(id);
        
        if (response.success) {
        setTasks(tasks.filter(t => t._id !== id));
        } else {
        setError('Failed to delete task');
        }
    } catch (err) {
        console.error('Error deleting task:', err);
        setError(err.message || 'Failed to delete task');
    }
};

const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.reload();
};

if (loading) {
    return (
        <div style={{
        padding: '40px',
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
        }}>
        ⏳ Loading tasks...
        </div>
    );
}

return (
    <>
        <Navbar user={user} onLogout={handleLogout} />
        <div className="dashboard">
        <div className="welcome-section">
            <h1>Welcome back, {user.name}!</h1>
            <p>Here's an overview of your tasks • Role: User</p>
        </div>

        {error && (
            <div style={{
            backgroundColor: '#fee',
            color: '#c33',
            padding: '12px',
            borderRadius: '4px',
            marginBottom: '16px'
            }}>
            {error}
            </div>
        )}

        <div className="stats-container">
            <StatsCard icon="✓" label="Total Tasks" count={stats.total} type="total" />
            <StatsCard icon="⏰" label="Pending" count={stats.pending} type="pending" />
            <StatsCard icon="▶" label="In Progress" count={stats.inProgress} type="progress" />
            <StatsCard icon="✓" label="Completed" count={stats.completed} type="completed" />
        </div>

        <div className="task-section">
            <div className="task-header">
            <h2>Your Tasks</h2>
            <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                ➕ Add Task
            </button>
            </div>
            <div className="task-content">
            {tasks.length === 0 ? (
                <div className="empty-state">
                <div className="empty-state-icon">📋</div>
                <p>No tasks yet. Create your first task!</p>
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    ➕ Create Task
                </button>
                </div>
            ) : (
                <TaskList tasks={tasks} onDelete={handleDeleteTask} />
            )}
            </div>
        </div>

        {showModal && (
            <TaskModal onClose={() => setShowModal(false)} onCreate={handleCreateTask} />
        )}
        </div>
    </>
);
}
