import { Task } from "../types/Task";

interface TaskCardProps {
    task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
    return (
        <li style={{ marginBottom: "1rem", borderBottom: "1px solid #ddd", paddingBottom: "0.5rem" }}>
            <strong>{task.task}</strong><br />
            {/* Category */}
            <h3 style={{ fontSize: "0.9rem", color: "#555" }}>{task.category}</h3>
            📅 {task.date} | ⏱ {task.duration} min
            <div style={{ fontSize: "0.9rem", marginTop: "0.3rem" }}>{task.description}</div>
        </li>
    );
}