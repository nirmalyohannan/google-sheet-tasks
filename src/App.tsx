import { useEffect, useState } from "react";
import "./App.css";

// {"date":"2025-05-20T18:30:00.000Z","task":"Clean 1st floor","category":"Other","duration":120,"description":"-Book shelf cleaned"}
class Task {
  date: string;
  task: string;
  category: string;
  duration: number;
  description: string;
  constructor(date: string, task: string, category: string, duration: number, description: string) {
    this.date = date;
    this.task = task;
    this.category = category;
    this.duration = duration;
    this.description = description;
  }
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const rawData = params.get("data");

    if (rawData) {
      try {
        const parsed = JSON.parse(decodeURIComponent(rawData));
        setTasks(parsed);
      } catch (e) {
        console.error("Failed to parse task data:", e);
      }
    }
  }, []);

  return (
    <div className="App" style={{ padding: "1rem", fontFamily: "sans-serif" }}>
      <h2>📋 Task Viewer</h2>
      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {tasks.map((task, index) => (
            <li key={index} style={{ marginBottom: "1rem", borderBottom: "1px solid #ddd", paddingBottom: "0.5rem" }}>
              <strong>{task.task}</strong><br />
              📅 {formatDateReadable(task.date)} | ⏱ {task.duration} min
              <div style={{ fontSize: "0.9rem", marginTop: "0.3rem" }}>{task.description}</div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function formatDateReadable(inputDate: string): string {
  const date = new Date(inputDate);
  if (isNaN(date.getTime())) return String(inputDate);
  const options = { day: "numeric", month: "short", year: "numeric" } as const;
  return date.toLocaleDateString("en-GB", options);
}

export default App;
