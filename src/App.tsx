import { useEffect, useState } from "react";
import { Task, type TaskData } from "./types/Task";
import { TaskCard } from "./components/TaskCard";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const rawData = params.get("data");
    if (rawData) {
      try {
        //parse to list
        const parsed = (JSON.parse(decodeURIComponent(rawData))) as TaskData[];
        const newList = parsed.map((task: TaskData) => new Task(task.Date, task.Task, task.Category, task["Duration(Minute)"], task.Description))
        setTasks(newList);
      } catch (e) {
        console.error("Failed to parse task data:", e);
      }
    }
  }, []);

  return (
    <div className="App" style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      <h2>📋 Task Viewer</h2>
      <div style={{
        backgroundColor: '#f5f5f5',
        padding: '1rem',
        borderRadius: '8px',
        marginBottom: '1.5rem',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}>
        <h3 style={{ margin: '0 0 0.5rem 0', color: '#333' }}>📅 Today's Tasks</h3>
        {(() => {
          const today = new Date().toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric'
          });
          const todayTasks = tasks.filter(task => task.date === today);
          const todayDuration = todayTasks.reduce((total, task) => total + task.duration, 0);

          return todayTasks.length > 0 ? (
            <div>
              <div style={{ fontSize: '0.9rem', color: '#666', marginBottom: '0.5rem' }}>
                {todayTasks.length} task{todayTasks.length !== 1 ? 's' : ''} • {todayDuration} minutes
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                {todayTasks.map((task, index) => (
                  <li key={index} style={{ fontSize: '0.9rem', color: '#444', marginBottom: '0.3rem' }}>
                    • {task.task} ({task.duration} min) <span className="badge text-bg-secondary">• {task.category}</span>
                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <div style={{ fontSize: '0.9rem', color: '#666' }}>No tasks done today</div>
          );
        })()}
      </div>
      <div style={{ marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '0.5rem' }}>
          <label htmlFor="category-select" style={{ marginRight: '0.5rem' }}>Filter by category:</label>
          <select
            id="category-select"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={{ padding: '0.3rem' }}
          >
            <option value="All">All Categories</option>
            {Array.from(new Set(tasks.map(task => task.category))).map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>
        <div style={{ fontSize: '0.9rem', color: '#666' }}>
          Total Duration: {tasks
            .filter(task => selectedCategory === 'All' || task.category === selectedCategory)
            .reduce((total, task) => total + task.duration, 0)} minutes
        </div>
      </div>
      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {tasks
            .filter(task => selectedCategory === 'All' || task.category === selectedCategory)
            .map((task, index) => (
              <TaskCard key={index} task={task} />
            ))}
        </ul>
      )}
    </div>
  );
}

export default App;
