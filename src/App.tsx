import { useEffect, useState } from "react";
import { Task, type TaskData } from "./types/Task";
import { TaskCard } from "./components/TaskCard";

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);

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
      {tasks.length === 0 ? (
        <p>No tasks available.</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {tasks.map((task, index) => (
            <TaskCard key={index} task={task} />
          ))}
        </ul>
      )}
    </div>
  );
}

export default App;
