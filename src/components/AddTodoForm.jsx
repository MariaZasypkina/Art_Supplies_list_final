import React, { useState } from "react";
import PropTypes from "prop-types";
import InputWithLabel from "./InputWithLabel";
import styles from "./AddTodoForm.module.css";

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
        className={styles.select}
      >
        <option value="">-- Select an item --</option>
        {recommendedMaterials.map((material, index) => (
          <option key={index} value={material}>
            {material}
          </option>
        ))}
      </select><br></br><br></br>
      <InputWithLabel
        todoTitle={todoTitle}
        handleTitleChange={handleTitleChange}
        className={styles.input}
      >
        Add  your  own  art  supply: 
      </InputWithLabel>
      <br></br>
      <button type="submit" className={styles.button}>Add</button>
      <br></br>
    </form>
  );
}

AddTodoForm.propTypes = {
  onAddTodo: PropTypes.func.isRequired,
  recommendedMaterials: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default AddTodoForm;
