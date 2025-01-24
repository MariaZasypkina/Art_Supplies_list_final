import React, { useState } from "react";
import PropTypes from "prop-types";

function AddTodoForm({ onAddTodo, recommendedMaterials }) {
  const [todoTitle, setTodoTitle] = useState(""); // State for custom input
  const [selectedMaterial, setSelectedMaterial] = useState(""); // State for dropdown

  // Handle input change for custom material
  const handleTitleChange = (event) => {
    setTodoTitle(event.target.value);
  };

  // Handle dropdown change
  const handleSelectChange = (event) => {
    setSelectedMaterial(event.target.value);
  };

  // Handle form submission
  const handleAddTodo = (event) => {
    event.preventDefault();

    // Decide whether to use custom input or selected material
    const title = selectedMaterial || todoTitle;
    if (title.trim()) {
      onAddTodo(title);
      setTodoTitle(""); // Reset custom input
      setSelectedMaterial(""); // Reset dropdown
    }
  };

  return (
    <form onSubmit={handleAddTodo}>
      {/* Dropdown for recommended materials */}
      <label htmlFor="recommendedMaterials">Choose Material:</label>
      <select
        id="recommendedMaterials"
        value={selectedMaterial}
        onChange={handleSelectChange}
      >
        <option value="">-- Select from recommended --</option>
        {recommendedMaterials.map((material, index) => (
          <option key={index} value={material}>
            {material}
          </option>
        ))}
      </select>

      {/* Input field for custom materials */}
      <label htmlFor="todoTitle">Or Add Your Own:</label>
      <input
        id="todoTitle"
        type="text"
        value={todoTitle}
        onChange={handleTitleChange}
        placeholder="Enter custom material"
      />

      <button type="submit">Add</button>
    </form>
  );
}

// Define prop types
AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
  recommendedMaterials: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AddTodoForm;
