import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import "./App.css";
import TodoList from "./components/TodoList";
import AddTodoForm from "./components/AddTodoForm";
import InputWithLabel from "./components/InputWithLabel";

function App() {
  const [todoList, setTodoList] = useState(() => {
    return JSON.parse(localStorage.getItem("userTodoList")) || [];
  });

  const [currentMode, setCurrentMode] = useState("Painting"); // Current mode
  const [customMaterial, setCustomMaterial] = useState("");

  const materialsByMode = {
    Painting: [
      "Brushes",
      "Acrylic Paints",
      "Oil Paints",
      "Watercolors",
      "Canvas",
      "Palette",
      "Easel",
      "Palette Knife",
      "Gesso",
      "Varnish",
    ],
    Sculpting: [
      "Clay",
      "Modeling Tools",
      "Wire",
      "Sculpting Knife",
      "Plaster",
      "Silicone Molds",
      "Wooden Modeling Tools",
      "Cutting Mat",
      "Sculpting Armature",
      "Polishing Tools",
    ],
    Drawing: [
      "Pencils",
      "Erasers",
      "Sketchpad",
      "Charcoal",
      "Blending Stumps",
      "Colored Pencils",
      "Fine Liners",
      "Markers",
      "Rulers",
      "Fixative Spray",
    ],
    Calligraphy: [
      "Calligraphy Pens",
      "Inks",
      "Special Paper",
      "Brush Pens",
      "Nib Holders",
      "Guideline Sheets",
      "Rulers for Layout",
      "Gold Ink",
      "Oblique Pen Holder",
      "Calligraphy Practice Pads",
    ],
    SoapMaking: [
      "Soap Base",
      "Essential Oils",
      "Dyes",
      "Silicone Molds",
      "Measuring Cups",
      "Double Boiler",
      "Thermometer",
      "Mixing Spoons",
      "Rubbing Alcohol Spray",
      "Packaging Materials",
    ],
    Mosaic: [
      "Glass Tiles",
      "Ceramic Tiles",
      "Tile Cutters",
      "Adhesive",
      "Grout",
      "Sponges",
      "Grouting Tools",
      "Gloves",
      "Mosaic Frames",
      "Sealer",
    ],
    Decoupage: [
      "Decoupage Paper",
      "Mod Podge",
      "Acrylic Paints",
      "Sandpaper",
      "Foam Brushes",
      "Scissors",
      "Sealer",
      "Gesso",
      "Wooden Items",
      "Varnish",
    ],
    JewelryMaking: [
      "Beads",
      "Wire",
      "Clasps",
      "Pliers Set",
      "Jewelry Findings",
      "Stringing Material",
      "Crimp Beads",
      "Gemstones",
      "Charms",
      "Wire Cutters",
    ],
    DigitalArt: [
      "Graphics Tablet",
      "Stylus",
      "Digital Art Software",
      "Color Calibration Tool",
      "High-Resolution Monitor",
      "Drawing Gloves",
      "Brush Packs",
      "Reference Images",
      "Keyboard Shortcuts Chart",
      "Cloud Storage",
    ],
    Photography: [
      "Camera",
      "Tripod",
      "Lighting Equipment",
      "Reflectors",
      "Backdrops",
      "Lenses",
      "Camera Bag",
      "Memory Cards",
      "Editing Software",
      "Filters",
    ],
    Weaving: [
      "Weaving Loom",
      "Warp Threads",
      "Weft Threads",
      "Shuttle",
      "Heddles",
      "Comb",
      "Scissors",
      "Weaving Needles",
      "Yarn",
      "Tension Device",
    ],
    CandleMaking: [
      "Wax (Soy, Beeswax, Paraffin)",
      "Wicks",
      "Fragrance Oils",
      "Dyes",
      "Candle Molds",
      "Double Boiler",
      "Thermometer",
      "Pouring Pitcher",
      "Glue Dots",
      "Wick Holders",
    ],
    Pyrography: [
      "Wood Burning Tool",
      "Wood Panels",
      "Carbon Paper",
      "Sandpaper",
      "Tips for Pyrography Tool",
      "Safety Gloves",
      "Rulers",
      "Stencils",
      "Design Templates",
      "Finishing Spray",
    ],
  };

  useEffect(() => {
    localStorage.setItem("userTodoList", JSON.stringify(todoList));
  }, [todoList]);

  const addTodo = (title) => {
    const newTodo = { id: Date.now(), title };
    setTodoList([...todoList, newTodo]);
  };

  const removeTodo = (id) => {
    const updatedList = todoList.filter((todo) => todo.id !== id);
    setTodoList(updatedList);
  };

  const clearTodoList = () => {
    setTodoList([]); // clear the list
  };

  const handleCustomMaterialChange = (event) => {
    setCustomMaterial(event.target.value);
  };

  const handleCustomMaterialSubmit = (event) => {
    event.preventDefault();
    if (customMaterial.trim()) {
      addTodo(customMaterial);
      setCustomMaterial(""); // Reset input field
    }
  };
  // render buttons to switch modes
  const renderModeButtons = (navigate) => {
    return (
      <div>
        {Object.keys(materialsByMode).map((mode) => (
          <button
            key={mode}
            onClick={() => {
              setCurrentMode(mode); // Switch mode
              if (navigate) navigate("/supplies"); // navigate to the list page
            }}
          >
            {mode}
          </button>
        ))}
      </div>
    );
  };

  //Home page

  function Home() {
    const navigate = useNavigate(); // Hook for navigation between pages

    return (
      <div>
        <br />
        <h2>Welcome to the Art Supplies List App!</h2>
        <h3>Part of the ArtNest Project</h3>
        <br />
        <p>Select your art type to get started:</p>
        <br />
        {/* Button to choose the mode */}
        {renderModeButtons(navigate)}
      </div>
    );
  }

    // Supplies page

    function SuppliesPage() {
      return (
        <div>
          <h2>Mode: {currentMode}</h2>
          {renderModeButtons()} {/* Render buttons for switching modes */}
          <AddTodoForm
            onAddTodo={addTodo}
            recommendedMaterials={materialsByMode[currentMode]} // Current mode supplies only
          />
          <form onSubmit={handleCustomMaterialSubmit}>
            <InputWithLabel
              todoTitle={customMaterial}
              handleTitleChange={handleCustomMaterialChange}
            >
              Add your own material:
            </InputWithLabel>
            <button type="submit">Add</button>
          </form>
          <TodoList todoList={todoList} onRemoveTodo={removeTodo} />
          <button onClick={() => window.print()}>Print List</button>
          <button onClick={clearTodoList}>Clear List</button>
        </div>
      );
    }
  
    return (
      <Router>
        <div>
          <h1>Art Supplies List</h1>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/supplies" element={<SuppliesPage />} />
          </Routes>
        </div>
      </Router>
    );
  }
  
  export default App;
