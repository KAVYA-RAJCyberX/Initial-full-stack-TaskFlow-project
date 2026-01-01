import { useState } from 'react';

export default function TaskModal({ onClose, onCreate }) {
const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'Medium',
    status: 'Pending',
    dueDate: '',
});

const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
    ...prev,
    [name]: value,
    }));
};

const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.title.trim()) {
    onCreate(formData);
    setFormData({ title: '', description: '', priority: 'Medium', status: 'Pending', dueDate: '' });
    }
};

return (
    <div className="modal-overlay" onClick={onClose}>
    <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
            <h2>Create New Task</h2>
            <button className="modal-close" onClick={onClose}>✕</button>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Title */}
        <div className="form-group">
            <label className="form-label">Title *</label>
            <input
                type="text"
                name="title"
                placeholder="Enter task title"
                className="form-input"
                value={formData.title}
                onChange={handleChange}
                required
            />
        </div>

          {/* Description */}
        <div className="form-group">
            <label className="form-label">Description</label>
            <textarea
                name="description"
                placeholder="Enter task description"
                className="form-input"
                rows="4"
                value={formData.description}
                onChange={handleChange}
                style={{ fontFamily: 'inherit', resize: 'vertical' }}
            />
        </div>

          {/* Priority & Status in Grid */}
        <div className="form-grid">
            <div className="form-group">
                <label className="form-label">Priority</label>
                <select
                    name="priority"
                    className="form-input"
                    value={formData.priority}
                    onChange={handleChange}
            >
                    <option>Low</option>
                    <option>Medium</option>
                    <option>High</option>
                </select>
            </div>

        <div className="form-group">
            <label className="form-label">Status</label>
            <select
                name="status"
                className="form-input"
                value={formData.status}
                onChange={handleChange}
            >
                <option>Pending</option>
                <option>In Progress</option>
                <option>Completed</option>
            </select>
        </div>
    </div>

          {/* Due Date */}
        <div className="form-group">
            <label className="form-label">Due Date</label>
            <input
                type="date"
                name="dueDate"
                className="form-input"
                value={formData.dueDate}
                onChange={handleChange}
            />
        </div>

          {/* Footer Buttons */}
        <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onClose}>
                Cancel
            </button>
            <button type="submit" className="btn btn-primary">
                Create Task
            </button>
        </div>
        </form>
    </div>
</div>
);
}
