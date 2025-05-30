import { Task } from '../types/Task';

interface TodayTasksProps {
    tasks: Task[];
}

export function TodayTasks({ tasks }: TodayTasksProps) {
    const today = new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
    });

    const todayTasks = tasks.filter(task => task.date === today);
    const todayDuration = todayTasks.reduce((total, task) => total + task.duration, 0);

    return (
        <div className="today-tasks">
            <h3 className="today-tasks-title">
                <span className="today-tasks-icon">📅</span>
                Today's Tasks
            </h3>
            {todayTasks.length > 0 ? (
                <div>
                    <div className="today-tasks-summary">
                        {todayTasks.length} task{todayTasks.length !== 1 ? 's' : ''} • {todayDuration} minutes
                    </div>
                    <ul className="today-tasks-list">
                        {todayTasks.map((task, index) => (
                            <li key={index} className="today-task-item">
                                <div className="today-task-item-content">• {task.task + " "}
                                    <span className='today-task-item-badges'>
                                        <span className="today-task-duration">{task.duration} min</span>
                                        <span className="today-task-category">• {task.category}</span>
                                    </span>
                                    {task.description && (
                                        <div className="today-task-description">
                                            {task.description}
                                        </div>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className="today-tasks-empty">No tasks completed today</div>
            )}
        </div>
    );
}