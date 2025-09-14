import { useState, useEffect } from "react";
import type { Todo } from "./types";
import { useAuth0 } from "@auth0/auth0-react";
import { authFetch } from "./api";
import { useSocket } from "./useSocket";

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTitle, setNewTitle] = useState("");

const { getAccessTokenSilently } = useAuth0();
const API_URL = import.meta.env.VITE_API_URL;
const socket = useSocket(API_URL); 

  const fetchTodos = async () => {
    const data: Todo[] =  await authFetch(`${API_URL}/todos`, {}, getAccessTokenSilently);
    setTodos(data);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

useEffect(() => {
  if (!socket) return;

  socket.on("newTodo", (todo: Todo) => {
    setTodos((prev) => [...prev, todo]);
  });

  socket.on("todoUpdated", (updated: Todo) => {
    setTodos((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t))
    );
  });

  socket.on("todoDeleted", (id: number) => {
    setTodos((prev) => prev.filter((t) => t.id !== id));
  });

  return () => {
    socket.off("newTodo");
    socket.off("todoUpdated");
    socket.off("todoDeleted");
  };
}, [socket]);

  const addTodo = async () => {
    if (!newTitle) return;
    await authFetch(`${API_URL}/todos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title: newTitle }),
    }, getAccessTokenSilently);
    setNewTitle("");
    fetchTodos();
  };

  const toggleComplete = async (id: number, completed: boolean) => {
    await authFetch(`${API_URL}/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed }),
    }, getAccessTokenSilently);
    fetchTodos();
  };

  const deleteTodo = async (id: number) => {
    await authFetch(`${API_URL}/todos/${id}`, {
      method: "DELETE",
    }, getAccessTokenSilently);
    fetchTodos();
  };

  const sendBroadcast = async () => {
    const token = await getAccessTokenSilently();
    await authFetch(`${API_URL}/broadcast`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    }, getAccessTokenSilently);
    console.log("📡 Broadcast elküldve!");
  };

  return (
    <div className="container mt-5">
      <h1>Endre Appja</h1>
      <button
        className="btn btn-warning mb-3"
        onClick={() => sendBroadcast()}
>
  Küldj broadcast üzenetet
</button>
      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Új Todo"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
        />
        <button className="btn btn-primary mt-2" onClick={addTodo}>
          Hozzáadás
        </button>
      </div>
      <ul className="list-group">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className={`list-group-item d-flex justify-content-between align-items-center ${
              todo.completed ? "list-group-item-success" : ""
            }`}
          >
            <span>{todo.title}</span>
            <div>
              <button
                className="btn btn-sm btn-outline-success me-2"
                onClick={() => toggleComplete(todo.id, todo.completed)}
              >
                {todo.completed ? "Vissza" : "Kész"}
              </button>
              <button
                className="btn btn-sm btn-outline-danger"
                onClick={() => deleteTodo(todo.id)}
              >
                Törlés
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
