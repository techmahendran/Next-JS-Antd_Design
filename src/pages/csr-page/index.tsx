// pages/index.tsx
import React, { useState, useEffect } from "react";

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

const Home: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/todos"
        );
        const todosData: Todo[] = await response.json();
        setTodos(todosData);
      } catch (error) {
        console.error("Error fetching todos:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Todos List</h2>
      <ol>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.title} - {todo.completed ? "Completed" : "Incomplete"}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Home;
