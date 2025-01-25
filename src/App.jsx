import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
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

function App() {
  const [localTodoList, setLocalTodoList] = useState(() => {
    return JSON.parse(localStorage.getItem("userTodoList")) || [];
  });

  const [currentMode, setCurrentMode] = useState("Painting");
  const [customMaterial, setCustomMaterial] = useState("");

  // Uploading daya from Airtable at start
  useEffect(() => {
    const fetchAirtableTodoList = async () => {
      try {
        const data = await fetchAirtableData();
        setLocalTodoList(data); // Reshresh local list
      } catch (error) {
        console.error("Error fetching data from Airtable:", error);
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
    setLocalTodoList([...localTodoList, tempTodo]); // Adding Locally

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

  const renderModeButtons = (navigate) => (
    <div>
      {Object.keys(materialsByMode).map((mode) => (
        <button
          key={mode}
          onClick={() => {
            setCurrentMode(mode);
            if (navigate) navigate("/supplies");
          }}
        >
          {mode}
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
    return (
      <div>
        <h2>Mode: {currentMode}</h2>
        {renderModeButtons()}
        <AddTodoForm
          onAddTodo={addTodo}
          recommendedMaterials={materialsByMode[currentMode]}
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
        <TodoList todoList={localTodoList} onRemoveTodo={removeTodo} />
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
