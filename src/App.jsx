import { useEffect, useState } from "react";
import "./App.css";

const API_URL =
  "https://1dtooqxx8l.execute-api.us-east-1.amazonaws.com/prod/Todos";

const today = new Date();

const days = Array.from({ length: 7 }, (_, i) => {
  const date = new Date(today);
  date.setDate(today.getDate() + i);

  return {
    name: date.toLocaleDateString("en-US", {
      weekday: "long"
    }),

    fullDate: date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric"
    }),

    label: i === 0 ? "today" : ""
  };
});

function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState("");
  const [day, setDay] = useState(days[0].name);

  async function getTodos() {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (Array.isArray(data)) {
        setTodos(data);
      } else {
        setTodos([]);
      }
    } catch (error) {
      console.error("Error getting todos:", error);
      setTodos([]);
    }
  }

  async function addTodo() {
    if (!task.trim()) return;

    await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        task: task,
        day: day
      })
    });

    setTask("");
    getTodos();
  }

  async function updateTodo(todo) {
    await fetch(`${API_URL}/${todo.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        task: todo.task,
        completed: !todo.completed,
        day: todo.day
      })
    });

    getTodos();
  }

  async function deleteTodo(id) {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });

    getTodos();
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="container">
      <h1>Weekly To-Do Calendar</h1>

      <div className="input-section">
        <input
          type="text"
          placeholder="Enter a task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />

        <select value={day} onChange={(e) => setDay(e.target.value)}>
          {days.map((dayObj) => (
            <option key={dayObj.name} value={dayObj.name}>
              {dayObj.name}
            </option>
          ))}
        </select>

        <button onClick={addTodo}>Add Task</button>
      </div>

      <div className="calendar">
        {days.map((dayObj) => (
          <div className="day-card" key={dayObj.name}>
            <h2 className="today-label">{dayObj.label || "\u00A0"}</h2>

            <h3>{dayObj.name}</h3>

            <p>{dayObj.fullDate}</p>

            {todos
              .filter((todo) => (todo.day || days[0].name) === dayObj.name)
              .map((todo) => (
                <div className="todo-item" key={todo.id}>
                  <span
                    onClick={() => updateTodo(todo)}
                    className={todo.completed ? "completed" : ""}
                  >
                    {todo.task}
                  </span>

                  <button className="delete-btn" onClick={() => deleteTodo(todo.id)}>
                    ×
                  </button>
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;