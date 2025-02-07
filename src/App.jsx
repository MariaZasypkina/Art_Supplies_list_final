import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";
import InputWithLabel from "./components/InputWithLabel";
import {
  fetchAirtableData,
  addAirtableRecord,
  deleteAirtableRecord,
  clearAirtableTable,
} from "./airtableAPI.js";
import materialsByMode from "./components/materials";
import Header from "./components/Header.jsx";

function App() {
  const [localTodoList, setLocalTodoList] = useState(() => {
    return JSON.parse(localStorage.getItem("userTodoList")) || [];
  });

  const [currentMode, setCurrentMode] = useState("Painting");
  const [customMaterial, setCustomMaterial] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  console.log("Initial isLoading:", isLoading);

  // Uploading daya from Airtable at start
  useEffect(() => {
    const fetchAirtableTodoList = async () => {
      try {
        const data = await fetchAirtableData();
        //Sorting by title
        const sortedData = data.sort((a, b) => a.title.localeCompare(b.title));
        setLocalTodoList(sortedData); // Reshresh local list
      } catch (error) {
        console.error("Error fetching data from Airtable:", error);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 800);
      }
    };
    fetchAirtableTodoList();
  }, []);

  // Sync with localStorage
  useEffect(() => {
    localStorage.setItem("userTodoList", JSON.stringify(localTodoList));
  }, [localTodoList]);

  // Adding supply
  const addTodo = async (title) => {
    const tempTodo = { id: Date.now().toString(), title };

    setLocalTodoList((prevList) => {
      //Adding locally
      const updatedList = [...prevList, tempTodo];
      return updatedList.sort((a, b) => a.title.localeCompare(b.title)); // Sort by title
    });

    try {
      const savedRecord = await addAirtableRecord(title); // Adding to Airtable
      setLocalTodoList((prevList) =>
        prevList.map((item) =>
          item.id === tempTodo.id ? { ...item, id: savedRecord.id } : item
        )
      );
    } catch (error) {
      console.error("Error adding to Airtable:", error);
    }
  };

  // Removing supply
  const removeTodo = async (id) => {
    setLocalTodoList(localTodoList.filter((todo) => todo.id !== id)); // From local storage

    try {
      await deleteAirtableRecord(id); // Delete in Airtable
    } catch (error) {
      console.error("Error deleting from Airtable:", error);
    }
  };

  // Clear all list
  const clearTodoList = async () => {
    const ids = localTodoList.map((item) => item.id);
    setLocalTodoList([]); // Locally

    try {
      await clearAirtableTable(ids); // In Airtable
    } catch (error) {
      console.error("Error clearing Airtable table:", error);
    }
  };

  const handleCustomMaterialChange = (event) => {
    setCustomMaterial(event.target.value);
  };

  const handleCustomMaterialSubmit = (event) => {
    event.preventDefault();
    if (customMaterial.trim()) {
      addTodo(customMaterial);
      setCustomMaterial(""); // Input field reset
    }
  };

  const renderModeButtons = (navigate) => (
    <div className="iconButtonsContainer">
      {Object.keys(materialsByMode).map((mode) => (
        <button
          key={mode}
          className="iconButton"
          onClick={() => {
            setCurrentMode(mode);
            if (navigate) navigate("/supplies");
          }}
        >
          <img
            src={`/images/icons/${mode.toLowerCase()}.jpg`}

            alt={mode}
            className="icon"
          />
          <span>{mode}</span>
        </button>
      ))}
    </div>
  );

  function Home() {
    const navigate = useNavigate();
    return (
      <div>
        <h2>Welcome to the Art Supplies List App!</h2>
        <h3>Part of the ArtNest Project</h3>
        {renderModeButtons(navigate)}
      </div>
    );
  }

  function SuppliesPage() {

const printList = () => {
  const printContents = document.getElementById("printableArea").cloneNode(true);
  const newWindow = window.open("", "_blank");
  
  newWindow.document.body.appendChild(printContents);
  newWindow.document.title = "Print List";
  newWindow.focus();
  newWindow.print();
  newWindow.close();
};

    return (
      <div>
        <h1>I'm interested in {currentMode}</h1>
        {renderModeButtons()}
        <AddTodoForm
          onAddTodo={addTodo}
          recommendedMaterials={materialsByMode[currentMode]}
        />

        <div id="printableArea">
          {isLoading ? (
            <p
              style={{ color: "green", fontSize: "14px", textAlign: "center" }}
            >
              Loading...
            </p>
          ) : (
            <TodoList todoList={localTodoList} onRemoveTodo={removeTodo} />
          )}
        </div>
        <div className="listButtons">
          <button onClick={printList} className="listButton">
            Print List
          </button>

          <button onClick={clearTodoList} className="listButton">
            Clear List
          </button>
        </div>
      </div>
    );
  }

  function AboutPage() {
    return (
      <div>
        <h2>About ArtNest Project</h2>
        <p>
          The ArtNest Project is a platform for artists of any age to share
          their passion for creativity, get inspiration and organize their
          supplies.
        </p>
      </div>
    );
  }

  return (
    <Router>
      <div>
        <Header /> {/*Navigation menu*/}
        <h1>Art Supplies List</h1>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/supplies" element={<SuppliesPage />} />
          <Route path="/about" element={<AboutPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
