import React from "react";
import PropTypes from "prop-types";

function TodoListItem({ todo, onRemoveTodo }) {
  return (
    <li>
      {todo.title}
      <button onClick={() => onRemoveTodo(todo.id)}>Remove</button>
    </li>
  );
}

// Define prop types
TodoListItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
  }).isRequired,
  onRemoveTodo: PropTypes.func.isRequired,
};

export default TodoListItem;
