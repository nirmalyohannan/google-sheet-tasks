import { useEffect, useState } from "react";
import { Task, type TaskData } from "./types/Task";
import { TaskCard } from "./components/TaskCard";
import { TodayTasks } from './components/TodayTasks';
import { CategorySelector } from './components/CategorySelector';
import './components/TodayTasks.css';
import './components/CategorySelector.css';
import './components/App.css';

function App() {
  const isInIframe = window !== window.parent;
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [categories, setCategories] = useState<string[]>([]);


  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const rawData = params.get("data");
    if (rawData) {
      try {
        //parse to list
        const parsed = (JSON.parse(decodeURIComponent(rawData))) as TaskData[];
        const newList = parsed.map((task: TaskData) => new Task(task.Date, task.Task, task.Category, task["Duration(Minute)"], task.Description))
        setTasks(newList);
        setCategories(Array.from(new Set(newList.map(task => task.category))));

      } catch (e) {
        console.error("Failed to parse task data:", e);
      }
    }
  }, []);

  return (
    <div className="App">
      <div className="version-info">Version: 0.0.2</div>
      <h2>
        <span>📋</span>
        Task Viewer
        {isInIframe && (
          <button
            onClick={() => window.open(window.location.href, '_blank')}
            style={{
              marginLeft: '1rem',
              padding: '0.25rem 0.5rem',
              fontSize: '0.8rem',
              background: '#e2e8f0',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Open Fullscreen
          </button>
        )}
      </h2>
      {tasks.length === 0 ? (
        <div>
          <p>No tasks available. The "data" parameter is missing in the URL.</p>
          <p>Please refer to the <a href="https://github.com/nirmalyohannan/google-sheet-tasks#" target="_blank" rel="noopener noreferrer">documentation</a> for instructions on how to link this app with your Google Sheet.</p>
        </div>
      ) : (
        <>
          <TodayTasks tasks={tasks} />
          <div style={{ marginBottom: '1rem' }}>
            <CategorySelector
              categories={categories}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
            />
            <div className="total-duration">
              Total Duration: {tasks
                .filter(task => selectedCategory === 'All' || task.category === selectedCategory)
                .reduce((total, task) => total + task.duration, 0)} minutes
            </div>
          </div>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {tasks
              .filter(task => selectedCategory === 'All' || task.category === selectedCategory)
              .map((task, index) => (
                <TaskCard key={index} task={task} />
              ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;
