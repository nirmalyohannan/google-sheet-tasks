import { Task } from '../types/Task';
import './TaskCard.css';

export interface TaskCardProps {
    task: Task;
}

export function TaskCard({ task }: TaskCardProps) {
    return (
        <li className="task-card">
            <div className="task-header">
                <h3 className="task-title">{task.task}</h3>
                <span className="task-category">{task.category}</span>
            </div>
            <div className="task-meta">
                <span>📅 {task.date}</span>
                <span>⏱ {task.duration} min</span>
            </div>
            <div className="task-description">{task.description}</div>
        </li>
    );
}