import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";

function App() {
  const [todoList, setTodoList] = useState(() => {
    // Load the user's list from localStorage on first render
    return JSON.parse(localStorage.getItem("userTodoList")) || [];
  });

  const [mode, setMode] = useState("Painting"); // Default mode

  // Recommended materials for different modes
  const materialsByMode = {
    Painting: ["Brushes", "Acrylic Paints", "Canvas", "Palette"],
    Sculpting: ["Clay", "Modeling Tools", "Wire", "Sculpting Knife"],
    Drawing: ["Pencils", "Erasers", "Sketchpad", "Charcoal"],
  };

  // Function to save the list to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("userTodoList", JSON.stringify(todoList));
  }, [todoList]);

  // Function to add a new material
  const addTodo = (title) => {
    const newTodo = { id: Date.now(), title };
    setTodoList([...todoList, newTodo]);
  };

  // Function to remove a material by ID
  const removeTodo = (id) => {
    const updatedList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedList);
  };

  return (
    <Router>
      <div>
        <h1>Art Supplies List</h1>

        {/* Mode Selection */}
        <div>
          <button onClick={() => setMode("Painting")}>Painting</button>
          <button onClick={() => setMode("Sculpting")}>Sculpting</button>
          <button onClick={() => setMode("Drawing")}>Drawing</button>
        </div>

        <Routes>
          {/* Home page */}
          <Route path="/" element={<h2>Welcome to the Art Supplies List App!</h2>} />

          {/* Supplies list page */}
          <Route
            path="/supplies"
            element={
              <div>
                <AddTodoForm
                  onAddTodo={addTodo}
                  recommendedMaterials={materialsByMode[mode]}
                />
                <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
                <button onClick={() => window.print()}>Print List</button>
              </div>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
