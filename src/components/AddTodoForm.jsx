import React, { useState } from "react";
import PropTypes from "prop-types";

function AddTodoForm({ onAddTodo, recommendedMaterials }) {
  const [selectedMaterial, setSelectedMaterial] = useState("");

  const handleSelectChange = (event) => {
    setSelectedMaterial(event.target.value);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    if (selectedMaterial.trim()) {
      onAddTodo(selectedMaterial);
      setSelectedMaterial(""); // Reset
    }
  };

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="recommendedMaterials">Select from recommended:</label>
      <select
        id="recommendedMaterials"
        value={selectedMaterial}
        onChange={handleSelectChange}
      >
        <option value="">-- Select an item --</option>
        {recommendedMaterials.map((material, index) => (
          <option key={index} value={material}>
            {material}
          </option>
        ))}
      </select>
      <button type="submit">Add</button>
    </form>
  );
}

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
  recommendedMaterials: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AddTodoForm;
