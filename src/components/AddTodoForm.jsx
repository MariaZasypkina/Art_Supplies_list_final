import React, { useState } from "react";
import PropTypes from "prop-types";
import InputWithLabel from "./InputWithLabel";

function AddTodoForm({ onAddTodo, recommendedMaterials }) {
  const [todoTitle, setTodoTitle] = useState("");

  const handleTitleChange = (event) => {
    setTodoTitle(event.target.value);
  };

  const handleAddTodo = (event) => {
    event.preventDefault();
    if (todoTitle.trim()) {
      onAddTodo(todoTitle);
      setTodoTitle(""); // Reset input field
    }
  };

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="recommendedMaterials">Select from recommended:</label>
      <select
        id="recommendedMaterials"
        value={todoTitle}
        onChange={handleTitleChange}
      >
        <option value="">-- Select an item --</option>
        {recommendedMaterials.map((material, index) => (
          <option key={index} value={material}>
            {material}
          </option>
        ))}
      </select>
      <InputWithLabel
        todoTitle={todoTitle}
        handleTitleChange={handleTitleChange}
      >
        Add your own item:
      </InputWithLabel>
      <button type="submit">Add</button>
    </form>
  );
}

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
  recommendedMaterials: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AddTodoForm;
