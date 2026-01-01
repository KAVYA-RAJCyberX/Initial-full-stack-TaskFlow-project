export default function TaskList({ tasks, onDelete }) {
return (
    <ul className="task-list">
        {tasks.map(task => (
    <li key={task.id} className="task-item">
        <div>
            <span className="task-title">{task.title}</span>
        </div>
        <button
            className="task-delete-btn"
            onClick={() => onDelete(task.id)}
        >
            ✕
        </button>
        </li>
        ))}
    </ul>
    );
}
